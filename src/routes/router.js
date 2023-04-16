import express from 'express';

import games from './gameRouter.js';
import graffitiTags from './graffitiTagRouter.js';
import songs from './songRouter.js';
import artists from './artistRouter.js';
import characters from './characterRouter.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

router.use('/games', games);
router.use('/songs', songs);
router.use('/artists', artists);
router.use('/graffiti-tags', graffitiTags);
router.use('/characters', characters);

export default router;