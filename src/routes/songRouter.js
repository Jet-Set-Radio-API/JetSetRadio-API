import express from 'express';


const songs = express.Router();

// Add game=jsr/jsrf query parameter on getSongs
songs.get('/', async (req, res) => await getSongs(req, res));
songs.get('/jsr/:id', async (req, res) => await getJSRSongs(req, res));
songs.get('/jsrf/:id', async (req, res) => await getJSRFSongs(req, res));

export default songs;