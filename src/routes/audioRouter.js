import express from 'express';

import { getAudio, getJSRAudio, getJSRAudioById, getJSRFAudio, getJSRFAudioById, getRandomAudio } from '../controllers/audioController.js';

const audio = express.Router();

audio.get('/', async (req, res) => /* #swagger.tags = ['Audio'] */ await getAudio(req, res));
audio.get('/random', async (req, res) => /* #swagger.tags = ['Audio'] */ await getRandomAudio(req, res));
audio.get('/jsr', async (req, res) => /* #swagger.tags = ['Audio'] */ await getJSRAudio(req, res));
audio.get('/jsr/:id', async (req, res) => /* #swagger.tags = ['Audio'] */ await getJSRAudioById(req, res));
audio.get('/jsrf', async (req, res) => /* #swagger.tags = ['Audio'] */ await getJSRFAudio(req, res));
audio.get('/jsrf/:id', async (req, res) => /* #swagger.tags = ['Audio'] */ await getJSRFAudioById(req, res));

export default audio;