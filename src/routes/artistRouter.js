import express from 'express';

import { getArtists, getRandomArtist, getArtistById, getSongsByArtist } from '../controllers/artistController.js';


const artists = express.Router();

artists.get('/', async (req, res) => /* #swagger.tags = ['Artists'] */ await getArtists(req, res));
artists.get('/random', async (req, res) => /* #swagger.tags = ['Artists'] */ await getRandomArtist(req, res));
artists.get('/:id', async (req, res) => /* #swagger.tags = ['Artists'] */ await getArtistById(req, res));
artists.get('/:id/songs', async (req, res) => /* #swagger.tags = ['Artists'] */ await getSongsByArtist(req, res));

export default artists;