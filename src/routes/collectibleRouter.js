import express from "express";
import {
  getAllCollectibles,
  getBRCCollectibleById,
} from "../controllers/collectibleController.js";

const collectibles = express.Router();

collectibles.get("/", async (req, res) => /* #swagger.tags = ['Collectible'] */ await getAllCollectibles(req, res));
collectibles.get("/:id", async (req, res) => /* #swagger.tags = ['Collectible'] */ await getBRCCollectibleById(req, res));

export default collectibles;
