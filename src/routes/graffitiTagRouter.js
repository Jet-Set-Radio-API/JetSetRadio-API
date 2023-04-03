import express from 'express';
import { getAllGraffitiTags, getJSRGraffitiTagById, getJSRFGraffitiTagById,
  getJSRGraffitiTags, getJSRFGraffitiTags } from '../controllers/graffitiTagController.js';


const graffitiTags = express.Router();

/**
 * @openapi
 * /v1/api/graffiti-tags:
 *  get:
 *    tags: 
 *      - GraffitiTags
 *    description: All graffiti tags
 *    responses:
 *      200:
 *        description: Returning all graffiti-tags from JSRF and JSR
 */
graffitiTags.get('/', async (req, res) => await getAllGraffitiTags(req, res));

/**
 * @openapi
 * /v1/api/graffiti-tags/jsr:
 *  get:
 *    tags: 
 *      - GraffitiTags
 *    description: JSR graffiti tags
 *    responses:
 *      200:
 *        description: Returning only graffiti-tags from JSR
 */
graffitiTags.get('/jsr', async (req, res) => await getJSRGraffitiTags(req, res));

/**
 * @openapi
 * /v1/api/graffiti-tags/jsr/{tagId}:
 *  get:
 *    tags: 
 *      - GraffitiTags
 *    description: A single GraffitiTag by Id
 *    parameters:
 *      - in: path
 *        name: tagId
 *        type: string
 *        required: true
 *        description: Object ID of the GraffitiTag to get
 *    responses:
 *      200:
 *        description: Returning GraffitiTag with given id
 */
graffitiTags.get('/jsr/:id', async (req, res) => await getJSRGraffitiTagById(req, res));

/**
 * @openapi
 * /v1/api/graffiti-tags/jsrf:
 *  get:
 *    tags: 
 *      - GraffitiTags
 *    description: JSRF graffiti tags
 *    responses:
 *      200:
 *        description: Returning only graffiti-tags from JSRF
 */
graffitiTags.get('/jsrf', async (req, res) => await getJSRFGraffitiTags(req, res));

/**
 * @openapi
 * /v1/api/graffiti-tags/jsrf/{tagId}:
 *  get:
 *    tags: 
 *      - GraffitiTags
 *    description: A single GraffitiTag by Id
 *    parameters:
 *      - in: path
 *        name: tagId
 *        type: string
 *        required: true
 *        description: Object ID of the GraffitiTag to get
 *    responses:
 *      200:
 *        description: Returning GraffitiTag with given id
 */
graffitiTags.get('/jsrf/:id', async (req, res) => await getJSRFGraffitiTagById(req, res));

export default graffitiTags;