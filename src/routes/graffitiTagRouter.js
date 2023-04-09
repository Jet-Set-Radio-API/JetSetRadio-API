import express from 'express';
import { getAllGraffitiTags, getJSRGraffitiTagById, getJSRFGraffitiTagById,
  getJSRGraffitiTags, getJSRFGraffitiTags } from '../controllers/graffitiTagController.js';


const graffitiTags = express.Router();

graffitiTags.get('/', async (req, res) => /* #swagger.tags = ['GraffitiTags'] */ await getAllGraffitiTags(req, res));
graffitiTags.get('/jsr', async (req, res) => /* #swagger.tags = ['GraffitiTags'] */ await getJSRGraffitiTags(req, res));
graffitiTags.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['GraffitiTags'] */ await getJSRGraffitiTagById(req, res));
graffitiTags.get('/jsrf', async (req, res) => /* #swagger.tags = ['GraffitiTags'] */ await getJSRFGraffitiTags(req, res));
graffitiTags.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['GraffitiTags'] */ await getJSRFGraffitiTagById(req, res));

export default graffitiTags;