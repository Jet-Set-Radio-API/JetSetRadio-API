import express from 'express';
import { 
  getLocations, 
  getRandomLocation,
  getJSRLocations, 
  getJSRFLocations, 
  getJSRLocationById, 
  getJSRFLocationById,
  getBRCLocations,
  getBRCLocationById
} from '../controllers/locationController.js';

export const locations = express.Router();

locations.get('/', async (req, res) => /* #swagger.tags = ['Locations'] */ await getLocations(req, res));
locations.get('/random', async (req, res) => /* #swagger.tags = ['Locations'] */ await getRandomLocation(req, res));
locations.get('/jsr', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRLocations(req, res));
locations.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRLocationById(req, res));
locations.get('/jsrf', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRFLocations(req, res));
locations.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRFLocationById(req, res));
locations.get('/brc', async (req, res) => /* #swagger.tags = ['Locations'] */ await getBRCLocations(req, res));
locations.get('/brc/:id', async (req, res) => /* #swagger.tags = ['Locations'] */ await getBRCLocationById(req, res));

export default locations;
