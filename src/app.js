import express from 'express';
import LOGGER from './utils/logger.js';
import MiddlewareManager from './managers/MiddlewareManager.js';


const middlewareManager = new MiddlewareManager();

const app = express();
const PORT = process.env.PORT;
middlewareManager.setMiddleware(app);

app.listen(PORT || 8080, () => {
  LOGGER.info(`JSR-API Listening on port ${PORT}`);
})