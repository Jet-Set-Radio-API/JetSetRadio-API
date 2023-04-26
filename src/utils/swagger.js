import swaggerAutogen from "swagger-autogen";
import dotenv from 'dotenv';
dotenv.config();

const doc = {
  info: {
    title: 'JetSetRadio-API',
    version: process.env.npm_package_version,
    description: 'Providing data for all things JSR and JSRF!',
  },
  host: process.env.BASE_URL.split('http://')[1],
  schemes: ['https', 'http'],
  basePath: '/v1/api/',
  tags: [
    {
      "name": "Games",
      "description": "Titles from the JetSetRadio Franchise"
    },
    {
      "name": "Characters",
      "description": "Characters from JSR/JSRF"
    },
    {
      "name": "Locations",
      "description": "Locations from JSR/JSRF"
    },
    {
      "name": "Levels",
      "description": "Levels from JSR"
    },
    {
      "name": "GraffitiTags",
      "description": "All Graffiti-Points from the games"
    },
    {
      "name": "Songs",
      "description": "Soundtrack Data from JSR and JSRF"
    },
    {
      "name": "Artists",
      "description": "Artist Data from JSR and JSRF"
    }
],
};

const outputFile = './src/utils/swagger-docs.json';
const endpointFiles = ['./src/routes/router.js'];

swaggerAutogen()(outputFile, endpointFiles, doc).then(async () => {
  await import('../app.js');
})