import express from 'express';
import { 
  getLocations, 
  getJSRLocations, 
  getJSRFLocations, 
  getJSRLocationById, 
  getJSRFLocationById,
} from '../controllers/locationController.js';

export const locations = express.Router();

locations.get('/', async (req, res) => /* #swagger.tags = ['Locations'] */ await getLocations(req, res));
locations.get('/jsr', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRLocations(req, res));
locations.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRLocationById(req, res));
locations.get('/jsrf', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRFLocations(req, res));
locations.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['Locations'] */ await getJSRFLocationById(req, res));

export default locations;
