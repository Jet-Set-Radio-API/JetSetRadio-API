import express from 'express';
import { getAllGames, getGameById } from '../controllers/gameController.js ';


const games = express.Router();

/**
 * @openapi
 * /v1/api/games:
 *  get:
 *    tags: 
 *      - Games
 *    description: Games in the Jet Set Radio Franchise
 *    responses:
 *      200:
 *        description: Returning all Games
 */
games.get('/', async (req, res) => await getAllGames(req, res));

/**
 * @openapi
 * /v1/api/games/{gameId}:
 *  get:
 *    tags: 
 *      - Games
 *    description: A single Game by Id
 *    parameters:
 *      - in: path
 *        name: gameId
 *        type: string
 *        required: true
 *        description: Object ID of the game to get
 *    responses:
 *      200:
 *        description: Returning Game with given id
 */
games.get('/:id', async (req, res) => await getGameById(req, res));

export default games;