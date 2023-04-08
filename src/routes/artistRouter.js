import express from 'express';

import { getArtists, getArtistById, getSongsByArtist } from '../controllers/artistController.js';


const artists = express.Router();

// Add game=jsr/jsrf query parameter on getArtists
artists.get('/', async (req, res) => await getArtists(req, res));
artists.get('/:id', async (req, res) => await getArtistById(req, res));
artists.get('/:id/songs', async (req, res) => await getSongsByArtist(req, res));

export default artists;