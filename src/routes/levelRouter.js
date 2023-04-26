import express from 'express';
import { getLevels, getLevelById } from "../controllers/locationController.js";

const levels = express.Router();

levels.get('/', async (req, res) => /* #swagger.tags = ['Levels'] */ await getLevels(req, res))
levels.get('/:id', async (req, res) => /* #swagger.tags = ['Levels'] */ await getLevelById(req, res))

export default levels;