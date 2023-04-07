import express from 'express';


const artists = express.Router();

// Add game=jsr/jsrf query parameter on getArtists
artists.get('/', async (req, res) => await getArtists(req, res));
artists.get('/:id', async (req, res) => await getArtistById(req, res));
artists.get('/:id/songs', async (req, res) => await getAllSongsByArtist(req, res));

export default artists;