import express from 'express';
import { getAllGames, getGameById } from '../controllers/gameController.js ';


const games = express.Router();

games.get('/', async (req, res) => /* #swagger.tags = ['Games'] */ await getAllGames(req, res));
games.get('/:id', async (req, res) => /* #swagger.tags = ['Games'] */ await getGameById(req, res));

export default games;