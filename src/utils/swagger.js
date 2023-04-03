import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import LOGGER from './logger.js';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JetSetRadio-API',
      version: process.env.npm_package_version,
    },
  },
  apis: ['./src/routes/gameRouter.js', './src/routes/graffitiTagRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setUpSwagger = (app) => {

  const docsPath = '/api-docs';
  // Swagger Page
  app.use(docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON
  app.get(`${docsPath}.json`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  LOGGER.info(`Docs available at ${process.env.BASE_URL}${docsPath}`);
}

export default setUpSwagger;