import express from 'express';
import { getAllCharacters, getJSRCharacters, getJSRFCharacters, getJSRCharacterById, getJSRFCharacterById, getBRCCharacters, getBRCCharacterById } from '../controllers/characterController.js';


const characters = express.Router();

characters.get('/', async (req, res) => /* #swagger.tags = ['Characters'] */ await getAllCharacters(req, res));
characters.get('/jsr', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRCharacters(req, res));
characters.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRCharacterById(req, res));
characters.get('/jsrf', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRFCharacters(req, res));
characters.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRFCharacterById(req, res));
characters.get('/brc', async (req, res) => /* #swagger.tags = ['Characters'] */ await getBRCCharacters(req, res));
characters.get('/brc/:id', async (req, res) => /* #swagger.tags = ['Characters'] */ await getBRCCharacterById(req, res));

export default characters;