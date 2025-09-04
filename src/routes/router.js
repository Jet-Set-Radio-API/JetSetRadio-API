import express from "express";

import games from "./gameRouter.js";
import graffitiTags from "./graffitiTagRouter.js";
import songs from "./songRouter.js";
import artists from "./artistRouter.js";
import characters from "./characterRouter.js";
import locations from "./locationRouter.js";
import levels from "./levelRouter.js";
import collectibles from "./collectibleRouter.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.use("/games", games);
router.use("/songs", songs);
router.use("/artists", artists);
router.use("/graffiti-tags", graffitiTags);
router.use("/characters", characters);
router.use("/locations", locations);
router.use("/levels", levels);
router.use("/collectibles", collectibles);

export default router;
