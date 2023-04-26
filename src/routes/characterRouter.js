import express from 'express';
import { getAllCharacters, getJSRCharacters, getJSRFCharacters, getJSRCharacterById, getJSRFCharacterById } from '../controllers/characterController.js';


const characters = express.Router();

characters.get('/', async (req, res) => /* #swagger.tags = ['Characters'] */ await getAllCharacters(req, res));
characters.get('/jsr', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRCharacters(req, res));
characters.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRCharacterById(req, res));
characters.get('/jsrf', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRFCharacters(req, res));
characters.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['Characters'] */ await getJSRFCharacterById(req, res));

export default characters;