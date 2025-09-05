import express from "express";
import {
  getCollectibles,
  getRandomCollectible,
  getCollectibleById,
} from "../controllers/collectibleController.js";

const collectibles = express.Router();

collectibles.get("/", async (req, res) => /* #swagger.tags = ['Collectibles'] */ await getCollectibles(req, res));
collectibles.get("/random", async (req, res) => /* #swagger.tags = ['Collectibles'] */ await getRandomCollectible(req, res));
collectibles.get("/:id", async (req, res) => /* #swagger.tags = ['Collectibles'] */ await getCollectibleById(req, res));

export default collectibles;
