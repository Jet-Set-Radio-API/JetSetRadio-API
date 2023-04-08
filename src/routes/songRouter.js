import express from 'express';

import { getSongs, getJSRSongs, getJSRSongById, getJSRFSongs, getJSRFSongById } from '../controllers/songController.js';

const songs = express.Router();

// Add game=jsr/jsrf query parameter on getSongs
songs.get('/', async (req, res) => await getSongs(req, res));
songs.get('/jsr', async (req, res) => await getJSRSongs(req, res));
songs.get('/jsr/:id', async (req, res) => await getJSRSongById(req, res));
songs.get('/jsrf', async (req, res) => await getJSRFSongs(req, res));
songs.get('/jsrf/:id', async (req, res) => await getJSRFSongById(req, res));

export default songs;