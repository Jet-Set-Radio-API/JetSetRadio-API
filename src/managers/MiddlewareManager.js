import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../utils/swagger-docs.json');

import HealthCheckManager from './HealthCheckManager.js';
import router from '../routes/router.js';
import { renderHome } from '../controllers/indexController.js';


const __dirname = dirname(fileURLToPath(import.meta.url));
const healthCheckManager = new HealthCheckManager();

class MiddlewareManager {

  setMiddleware(app) {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
  
    app.use(cors());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/', (req, res) => renderHome(req, res));
    app.get('/health', (req, res) => res.send(healthCheckManager.getAppHealth()));
    app.use('/v1/api', router);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(data))
  }

}

export default MiddlewareManager;