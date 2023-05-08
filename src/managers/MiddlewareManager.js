import express from 'express';
import listEndpoints from 'express-list-endpoints';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import MemoryCache from 'memory-cache';
import favicon from 'serve-favicon';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../utils/swagger-docs.json');
import dotenv from 'dotenv';
dotenv.config();

import Constants from '../constants/dbConstants.js';
import HealthCheckManager from './HealthCheckManager.js';
import router from '../routes/router.js';
import { renderHome } from '../controllers/indexController.js';
import { listCollections } from '../config/db.js';


const cache = new MemoryCache.Cache();
const __dirname = dirname(fileURLToPath(import.meta.url));
const healthCheckManager = new HealthCheckManager();
const { CORE_DB, JSR_DB, JSRF_DB } = Constants;

class MiddlewareManager {

  setMiddleware(app) {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
  
    app.use(cors());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(favicon(path.join(__dirname, '..', 'public', 'img', 'favicon.ico')));

    app.get('/', (req, res) => renderHome(req, res));
    app.get('/health', (req, res) => res.send(healthCheckManager.getAppHealth()));
    app.get('/endpoints', async (req, res) => res.send(await filterPipeRoutes(req, listEndpoints(app))));
    app.use('/v1/api', [limiter, cacheMiddleware], router);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(data))
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
  const coreCollections = coreCollectionsObj.map(col => { return `${col.name.toLowerCase()}s` });
  const jsrCollections = jsrCollectionsObj.map(col => { return `${col.name.toLowerCase()}s` });
  const jsrfCollections = jsrfCollectionsObj.map(col => { return `${col.name.toLowerCase()}s` });

  endpoints = endpoints
    .filter(endpoint => pipe 
      ? !endpoint.path.includes(':') && endpoint.path.includes('/v1/api') 
      : endpoint)
    .map(endpoint => { return endpoint.path })

  if (pipe) {
    const filteredEndpoints = [];
    for (const endpoint of endpoints) {
      const model = endpoint.split('/')[3].replace('-', '');
      if (coreCollections.includes(model)) {
        filteredEndpoints.push(endpoint);
      }
      if (jsrCollections.includes(model) && endpoint.includes('jsr')) {
        filteredEndpoints.push(endpoint);
      }
      if (jsrfCollections.includes(model) && endpoint.includes('jsrf')) {
        filteredEndpoints.push(endpoint);
      }
    }
    endpoints = filteredEndpoints;
  }
  return [...new Set(endpoints)];
}

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour time range
  max: 1000, // 1000 requests limit
  keyGenerator: (req) => { 
    return req.ip;
  },
});

const cacheMiddleware = (req, res, next) => {
  const clientIp = req.ip; 
  const cacheKey = `cache_${clientIp}_${req.originalUrl || req.url}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache hit for url ${req.url}`);
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cachedData);
    } catch (err) {
      console.error(`Error parsing cached response for key ${cacheKey}: ${err}`);
      cache.del(cacheKey);
      return next();
    }
    return res.json(parsedResponse);
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    cache.put(cacheKey, body, 3600000); // 1 hour cache time
    res.sendResponse(body);
  };
  console.log(`Cache missed for url ${req.url}`);
  next();
};

export default MiddlewareManager;