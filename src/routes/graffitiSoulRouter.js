import express from "express";
import {
  getAllGraffitiSouls,
  getRandomGraffitiSoul,
  getJSRGraffitiSouls,
  getJSRGraffitiSoulById,
  getJSRFGraffitiSouls,
  getJSRFGraffitiSoulById,
} from "../controllers/graffitiSoulController.js";

const graffitiSouls = express.Router();

graffitiSouls.get(
  "/",
  async (req, res) =>
    /* #swagger.tags = ['GraffitiSouls'] */ await getAllGraffitiSouls(req, res)
);
graffitiSouls.get(
  "/random",
  async (req, res) =>
    /* #swagger.tags = ['GraffitiSouls'] */ await getRandomGraffitiSoul(
      req,
      res
    )
);
graffitiSouls.get(
  "/jsr",
  async (req, res) =>
    /* #swagger.tags = ['GraffitiSouls'] */ await getJSRGraffitiSouls(req, res)
);
graffitiSouls.get(
  "/jsr/:id",
  async (req, res) =>
    /* #swagger.tags = ['GraffitiSouls'] */ await getJSRGraffitiSoulById(
      req,
      res
    )
);
graffitiSouls.get(
  "/jsrf",
  async (req, res) =>
    /* #swagger.tags = ['GraffitiSouls'] */ await getJSRFGraffitiSouls(req, res)
);
graffitiSouls.get(
  "/jsrf/:id",
  async (req, res) =>
    /* #swagger.tags = ['GraffitiSouls'] */ await getJSRFGraffitiSoulById(
      req,
      res
    )
);

export default graffitiSouls;
