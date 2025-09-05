import express from "express";
import listEndpoints from "express-list-endpoints";
import {fileURLToPath} from "url";
import path, {dirname} from "path";
import cors from "cors";
import * as bcrypt from "bcrypt";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import MemoryCache from "memory-cache";
import favicon from "serve-favicon";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const data = require("../utils/swagger-docs.json");
import dotenv from "dotenv";
dotenv.config();

import Constants from "../constants/dbConstants.js";
import HealthCheckManager from "./HealthCheckManager.js";
import router from "../routes/router.js";
import {renderHome, renderDocs} from "../controllers/indexController.js";
import {listCollections} from "../config/db.js";
import LOGGER from "../utils/logger.js";
import {Actions} from "../config/dbActions.js";
import {performCoreAdminAction} from "../config/db.js";

const cache = new MemoryCache.Cache();
const __dirname = dirname(fileURLToPath(import.meta.url));
const healthCheckManager = new HealthCheckManager();
const {CORE_DB, JSR_DB, JSRF_DB, BRC_DB} = Constants;

class MiddlewareManager {
  setMiddleware(app) {
    app.set("views", path.join(__dirname, "..", "views"));
    app.set("view engine", "ejs");

    app.use(cors());
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(
      favicon(path.join(__dirname, "..", "public", "img", "favicon.ico"))
    );

    app.get("/", (req, res) => renderHome(req, res));
    app.get("/docs", (req, res) => renderDocs(req, res));
    app.get("/health", (req, res) =>
      res.send(healthCheckManager.getAppHealth())
    );
    app.get("/endpoints", async (req, res) =>
      res.send(await filterPipeRoutes(req, listEndpoints(app)))
    );
    app.post("/cache/clear", async (req, res) => await clearCache(req, res));
    app.use("/v1/api", [limiter, cacheMiddleware], router);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(data));
  }
}

/**
 * Return a list of Available Endpoints
 * Pass pipe=true to filter the results to just the routes needed to populate a development database
 *
 * @param {*} req : the express request object
 * @param {*} endpoints : the unfiltered endpoints object list
 * @returns
 */
const filterPipeRoutes = async (req, endpoints) => {
  const pipe = req?.query?.pipe;
  const coreCollectionsObj = await listCollections(CORE_DB);
  const jsrCollectionsObj = await listCollections(JSR_DB);
  const jsrfCollectionsObj = await listCollections(JSRF_DB);
  const brcCollectionsObj = await listCollections(BRC_DB);

  const coreCollections = coreCollectionsObj.map((col) => {
    return `${col.name.toLowerCase()}s`;
  });
  const jsrCollections = jsrCollectionsObj.map((col) => {
    return `${col.name.toLowerCase()}s`;
  });
  const jsrfCollections = jsrfCollectionsObj.map((col) => {
    return `${col.name.toLowerCase()}s`;
  });
  const brcCollections = brcCollectionsObj.map((col) => {
    return `${col.name.toLowerCase()}s`;
  });

  endpoints = endpoints
    .filter((endpoint) =>
      pipe
        ? !endpoint.path.includes(":") && endpoint.path.includes("/v1/api")
        : endpoint
    )
    .map((endpoint) => {
      return endpoint.path;
    });

  if (pipe) {
    const filteredEndpoints = [];
    for (const endpoint of endpoints) {
      const model = endpoint.split("/")[3].replace("-", "");
      console.log("processing model: ", model, " and endpoint: ", endpoint);
      if (coreCollections.includes(model)) {
        filteredEndpoints.push(endpoint);
      }
      if (jsrCollections.includes(model) && endpoint.includes("jsr") || endpoint.includes("collectibles")) {
        filteredEndpoints.push(endpoint);
      }
      if (jsrfCollections.includes(model) && endpoint.includes("jsrf")) {
        filteredEndpoints.push(endpoint);
      }
      if (
        brcCollections.includes(model) &&
        (endpoint.includes("brc") || endpoint.includes("collectibles"))
      ) {
        filteredEndpoints.push(endpoint);
      }
    }
    endpoints = filteredEndpoints;
  }
  return [...new Set(endpoints)];
};

/* Rate Limiting */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour time range
  max: 1000, // 1000 requests limit
  keyGenerator: (req) => {
    return req.ip;
  },
});

/* Set Cache */
const cacheMiddleware = (req, res, next) => {
  const clientIp = req.ip;
  const cacheKey = `cache_${clientIp}_${req.originalUrl || req.url}`;

  /* Don't cache 'Random' routes */
  if (req?.path.includes("random")) {
    return next();
  }

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    LOGGER.info(`Cache hit for url ${req.url}`);
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cachedData);
    } catch (err) {
      LOGGER.error(`Error parsing cached response for key ${cacheKey}: ${err}`);
      cache.del(cacheKey);
      return next();
    }
    return res.json(parsedResponse);
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    cache.put(cacheKey, body, 3600000); // 1 hour cache time, restart the service to bypass
    res.sendResponse(body);
  };
  LOGGER.info(`Cache missed for url ${req.url}`);
  next();
};

/* Clear Cache */
const clearCache = async (req, res) => {
  const username = req?.body?.username;
  const password = req?.body?.password;
  const adminUser = await performCoreAdminAction(Actions.fetchAdmin, username);
  if (!adminUser) {
    LOGGER.error("Admin User Not Found");
    return res.status(400).send();
  }
  const authenticated = await validatePassword(password, adminUser?.password);
  if (!authenticated) {
    LOGGER.error("Invalid Admin Creds!");
    return res.status(401).send("Unauthorized");
  }
  if (adminUser && authenticated) {
    cache.clear();
    LOGGER.info("All Caches Cleared");
    return res.send("Cache Cleared");
  }
  res.status(500).send("Unexpected Behavior");
};

const validatePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    LOGGER.warn(`Error validating Admin password ${err}`);
  }
};

export default MiddlewareManager;
