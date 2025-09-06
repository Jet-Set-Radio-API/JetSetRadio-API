import {performDBAction} from "../config/db.js";
import {Actions} from "../config/dbActions.js";
import Constants from "../constants/dbConstants.js";
import LOGGER from "../utils/logger.js";

const {JSR_DB, JSRF_DB, BRC_DB, gameMap} = Constants;

/* Helper Functions to support all other Controllers */
export const fetchRandom = async (req, resource, game) => {
  try {
    const games = [JSR_DB, JSRF_DB, BRC_DB];
    const selectedGame = req?.query?.game;
    const count = Number(req?.query?.count);
    const safeCount = Number.isFinite(count) && count > 0 ? count : 1;

    /* if a game is provided */
    if (game || selectedGame) {
      const dbName = game || gameMap[selectedGame];
      return await performDBAction(
        Actions.fetchRandom,
        dbName,
        resource,
        safeCount
      );
    }

    /* If no game is provided, select a random characters from a random games */
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    let remaining = safeCount;
    const promises = [];

    for (const dbName of shuffled) {
      if (remaining <= 0) break;
      const take = Math.min(
        remaining,
        Math.floor(Math.random() * remaining) + 1
      );
      remaining -= take;
      promises.push(
        performDBAction(Actions.fetchRandom, dbName, resource, take)
      );
    }

    const results = await Promise.all(promises);
    return results.flat();
  } catch (err) {
    LOGGER.error(`Error fetching random ${resource} from game ${game}`, err);
    return [];
  }
};
