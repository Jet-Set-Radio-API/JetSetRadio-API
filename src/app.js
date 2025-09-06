import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import LOGGER from "./utils/logger.js";
import {connectToDb} from "./config/db.js";
import MiddlewareManager from "./managers/MiddlewareManager.js";

const middlewareManager = new MiddlewareManager();

const app = express();
const PORT = process.env.PORT;
const baseUrl = process.env.BASE_URL;

middlewareManager.setMiddleware(app);

(async () => {
  await connectToDb(); // connect once
  app.listen(PORT || 8080, () => {
    LOGGER.info(`JSR-API Listening on port ${PORT}`);

    // Ping App every 10 minutes
    setInterval(async () => {
      const res = await axios.get(`${baseUrl}/health`);
      console.log(`App Ping - ${baseUrl}. Status: ${res.data.message}`);
    }, 600000);
  });
})();
