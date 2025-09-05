import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import LOGGER from "../utils/logger.js";

const Location = "Location";
const Level = "Level";
const {JSR_DB, JSRF_DB, BRC_DB, gameMap} = Constants;

export const getLocations = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const locations = await fetchLocations(req, "ALL");
    if (sortByValue) {
      return res.send(locations.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send(locations);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Locations`, err);
    res.status(500).json({message: "Failed to fetch ALL locations", err: err});
  }
};

export const getRandomLocation = async (req, res) => {
  try {
    const games = [JSR_DB, JSRF_DB, BRC_DB];
    const userSelectedGame = req?.query?.game;
    let game =
      gameMap[userSelectedGame] ||
      games[Math.floor(Math.random() * games.length)];
    const randomLocation = await fetchRandomLocation(req, game);
    res.json(randomLocation[0]);
  } catch (err) {
    LOGGER.error(`Could not fetch random location`, err);
    res.status(500).json({error: "Failed to fetch random location"});
  }
};

export const getJSRLocations = async (req, res) => {
  try {
    res.send(await fetchLocations(req, JSR_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Locations`, err);
    res.status(500).json({message: "Failed to fetch JSR locations", err: err});
  }
};

export const getJSRLocationById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performDBAction(Actions.fetchById, JSR_DB, Location, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Location With ID: ${id}`, err);
    res
      .status(500)
      .json({message: `Failed to fetch JSR location By ID ${id}`, err: err});
  }
};

export const getJSRFLocations = async (req, res) => {
  try {
    res.send(await fetchLocations(req, JSRF_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Locations`, err);
    res.status(500).json({message: "Failed to fetch JSRF locations", err: err});
  }
};

export const getJSRFLocationById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performDBAction(Actions.fetchById, JSRF_DB, Location, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Location With ID: ${id}`, err);
    res
      .status(500)
      .json({message: `Failed to fetch JSRF location By ID ${id}`, err: err});
  }
};

export const getBRCLocations = async (req, res) => {
  try {
    res.send(await fetchLocations(req, BRC_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Locations`, err);
    res.status(500).json({message: "Failed to fetch BRC locations", err: err});
  }
};

export const getBRCLocationById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performDBAction(Actions.fetchById, BRC_DB, Location, id));
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Location With ID: ${id}`, err);
    res
      .status(500)
      .json({message: `Failed to fetch BRC location By ID ${id}`, err: err});
  }
};

export const getLevels = async (req, res) => {
  try {
    res.send(await fetchJSRLevels(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Levels`, err);
    res.status(500).json({message: "Failed to fetch JSR levels", err: err});
  }
};

export const getLevelById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performDBAction(Actions.fetchById, JSR_DB, Level, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Level with ID ${id}`, err);
    res
      .status(500)
      .json({message: `Failed to fetch JSR level By ID ${id}`, err: err});
  }
};

export const fetchJSRLevels = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      JSR_DB,
      Level,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, JSR_DB, Level, null);
};

export const fetchLocations = async (req, dbName) => {
  if (dbName === "ALL") {
    const jsrLocations = await fetchLocations(req, JSR_DB);
    const jsrfLocations = await fetchLocations(req, JSRF_DB);
    const brcLocations = await fetchLocations(req, BRC_DB);
    const allLocations = [...jsrLocations, ...jsrfLocations, ...brcLocations];
    return allLocations;
  }

  return await performDBAction(
    Actions.fetchWithQuery,
    dbName,
    Location,
    null,
    req?.query
  );
};

export const fetchRandomLocation = async (req, dbName) => {
  return await performDBAction(
    Actions.fetchRandom,
    dbName,
    Location,
    null,
    req?.query
  );
};
