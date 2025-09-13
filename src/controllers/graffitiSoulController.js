import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import LOGGER from "../utils/logger.js";
import {fetchRandom} from "./utilController.js";

const GraffitiSoul = "GraffitiSoul";
const {JSR_DB, JSRF_DB} = Constants;

export const getAllGraffitiSouls = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const jsrSouls = await fetchJSRSouls(req);
    const jsrfSouls = await fetchJSRFSouls(req);
    if (sortByValue) {
      const Souls = [...jsrSouls, ...jsrfSouls];
      return res.send(Souls.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send([...jsrSouls, ...jsrfSouls]);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL GraffitiSouls`, err);
    res
      .status(500)
      .json({message: "Failed to fetch ALL GraffitiSouls", err: err});
  }
};

export const getRandomGraffitiSoul = async (req, res) => {
  try {
    res.send(await fetchRandom(req, GraffitiSoul));
  } catch (err) {
    LOGGER.error(`Could not fetch random GraffitiSoul`, err);
    res.status(500).json({error: "Failed to fetch random GraffitiSoul"});
  }
};

export const getJSRGraffitiSouls = async (req, res) => {
  try {
    res.send(await fetchJSRSouls(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR GraffitiSouls`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSR GraffitiSouls", err: err});
  }
};

export const getJSRFGraffitiSouls = async (req, res) => {
  try {
    res.send(await fetchJSRFSouls(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF GraffitiSouls`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSRF GraffitiSouls", err: err});
  }
};

export const getJSRGraffitiSoulById = async (req, res) => {
  try {
    const soulId = req?.params?.id;
    res.send(
      await performDBAction(Actions.fetchById, JSR_DB, GraffitiSoul, soulId)
    );
  } catch (err) {
    LOGGER.error(`Could not fetch JSR GraffitiSoul With ID: ${soulId}`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSR GraffitiSoul By ID", err: err});
  }
};

export const getJSRFGraffitiSoulById = async (req, res) => {
  try {
    const soulId = req?.params?.id;
    res.send(
      await performDBAction(Actions.fetchById, JSRF_DB, GraffitiSoul, soulId)
    );
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF GraffitiSoul With ID: ${soulId}`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSRF GraffitiSoul By ID", err: err});
  }
};

export const fetchJSRSouls = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      JSR_DB,
      GraffitiSoul,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, JSR_DB, GraffitiSoul, null);
};

export const fetchJSRFSouls = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      JSRF_DB,
      GraffitiSoul,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, JSRF_DB, GraffitiSoul, null);
};
