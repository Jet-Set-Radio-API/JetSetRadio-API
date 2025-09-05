import express from 'express';

import { getSongs, getRandomSong, getJSRSongs, getJSRSongById, getJSRFSongs, getJSRFSongById, getBRCSongs, getBRCSongById } from '../controllers/songController.js';


const songs = express.Router();

songs.get('/', async (req, res) => /* #swagger.tags = ['Songs'] */ await getSongs(req, res));
songs.get('/random', async (req, res) => /* #swagger.tags = ['Songs'] */ await getRandomSong(req, res));
songs.get('/jsr', async (req, res) => /* #swagger.tags = ['Songs'] */ await getJSRSongs(req, res));
songs.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['Songs'] */ await getJSRSongById(req, res));
songs.get('/jsrf', async (req, res) => /* #swagger.tags = ['Songs'] */ await getJSRFSongs(req, res));
songs.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['Songs'] */ await getJSRFSongById(req, res));
songs.get('/brc', async (req, res) => /* #swagger.tags = ['Songs'] */ await getBRCSongs(req, res));
songs.get('/brc/:id', async (req, res) => /* #swagger.tags = ['Songs'] */ await getBRCSongById(req, res));

export default songs;