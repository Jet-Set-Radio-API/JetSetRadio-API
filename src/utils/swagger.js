import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "JetSetRadio-API",
    version: process.env.npm_package_version,
    description:
      "Providing data for all things Jet Set Radio, Jet Set Radio Future, and Bomb Rush Cyberfunk!",
  },
  host: process.env.BASE_URL.split("http://")[1],
  schemes: ["https", "http"],
  basePath: "/v1/api/",
  tags: [
    {
      name: "Games",
      description: "Titles from the JetSetRadio Franchise & Surrounding games",
    },
    {
      name: "Characters",
      description: "Characters from JSR, JSRF, and BRC",
    },
    {
      name: "Locations",
      description: "Locations from JSR, JSRF, and BRC",
    },
    {
      name: "Levels",
      description: "Levels from JSR",
    },
    {
      name: "GraffitiTags",
      description: "All Graffiti-Points from JSR and JSRF",
    },
    {
      name: "Songs",
      description: "Soundtrack Data from JSR, JSRF, and BRC",
    },
    {
      name: "Artists",
      description: "Artist Data from JSR, JSRF, and BRC",
    },
    ,
    {
      name: "Collectibles",
      description: "Collectible Data from BRC",
    },
  ],
};

const outputFile = "./src/utils/swagger-docs.json";
const endpointFiles = ["./src/routes/router.js"];

swaggerAutogen()(outputFile, endpointFiles, doc).then(async () => {
  await import("../app.js");
});
