import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import LOGGER from "../utils/logger.js";
import {fetchRandom} from "./utilController.js";

const Collectible = "Collectible";
const {BRC_DB} = Constants;

export const getCollectibles = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const allCollectibles = await fetchCollectibles(req);
    if (sortByValue) {
      const collectibles = [...allCollectibles];
      return res.send(collectibles.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send([...allCollectibles]);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Collectibles`, err);
    res
      .status(500)
      .json({message: "Failed to fetch ALL Collectibles", err: err});
  }
};

export const getRandomCollectible = async (req, res) => {
  try {
    res.send(await fetchRandom(req, Collectible, BRC_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch random collectible`, err);
    res.status(500).json({error: "Failed to fetch random collectible"});
  }
};

export const getCollectibleById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performDBAction(Actions.fetchById, BRC_DB, Collectible, id));
  } catch (err) {
    LOGGER.error(`Could not fetch Collectible With ID: ${tagId}`, err);
    res
      .status(500)
      .json({message: `Failed to fetch Collectible by Id ${id}`, err: err});
  }
};

export const fetchCollectibles = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      BRC_DB,
      Collectible,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, BRC_DB, Collectible, null);
};

export const fetchRandomCollectible = async (req, dbName, count) => {
  return await performDBAction(Actions.fetchRandom, dbName, Collectible, count);
};
