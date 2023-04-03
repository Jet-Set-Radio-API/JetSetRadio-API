import express from 'express';

import games from './gameRouter.js';
import graffitiTags from './graffitiTagRouter.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

router.use('/games', games);
router.use('/graffiti-tags', graffitiTags);

export default router;