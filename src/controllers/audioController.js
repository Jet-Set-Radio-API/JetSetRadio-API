import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import {fetchRandom} from "./utilController.js";
import LOGGER from "../utils/logger.js";

const Audio = "Audio";
const {JSR_DB, JSRF_DB} = Constants;

export const getAudio = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const audio = await fetchAudio(req, "ALL");
    if (sortByValue) {
      return res.send(audio.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send(audio);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL ${Audio}`, err);
    res.status(500).send(`Could not fetch ALL ${Audio} due to error:`, err);
  }
};

export const getRandomAudio = async (req, res) => {
  try {
    res.send(await fetchRandom(req, Audio));
  } catch (err) {
    LOGGER.error(`Could not fetch random ${Audio}`, err);
    res.status(500).json({error: `Failed to fetch random ${Audio}`});
  }
};

export const getJSRAudio = async (req, res) => {
  try {
    const jsrAudio = await fetchAudio(req, JSR_DB);
    if (jsrAudio) {
      return res.send(jsrAudio);
    }
    res.status(404).send();
  } catch (err) {
    LOGGER.error(`Could not fetch JSR ${Audio}`, err);
    res.status(500).send(`Could not fetch JSR ${Audio}`, err);
  }
};

export const getJSRAudioById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const jsrAudio = await performDBAction(
      Actions.fetchById,
      JSR_DB,
      Audio,
      id
    );
    if (jsrAudio) {
      return res.send(jsrAudio);
    }
    res
      .status(404)
      .send(`JSR ${Audio} Resource could not be found at requested location`);
  } catch (err) {
    LOGGER.error(`Could not fetch JSR ${Audio} by ID ${req?.params?.id}`, err);
    res
      .status(500)
      .send(`Could not fetch JSR ${Audio} with ID: ${req.params.id}`, err);
  }
};

export const getJSRFAudio = async (req, res) => {
  try {
    const jsrfAudio = await fetchAudio(req, JSRF_DB);
    if (jsrfAudio) {
      return res.send(jsrfAudio);
    }
    res.status(404).send();
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF ${Audio}`, err);
    res.status(500).send(`Could not fetch JSRF ${Audio}`, err);
  }
};

export const getJSRFAudioById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const jsrfAudio = await performDBAction(
      Actions.fetchById,
      JSRF_DB,
      Audio,
      id
    );
    if (jsrfAudio) {
      return res.send(jsrfAudio);
    }
    res
      .status(404)
      .send(`JSRF ${Audio} Resource could not be found at requested location`);
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF ${Audio} by ID`, err);
    res
      .status(500)
      .send(`Could not fetch JSRF ${Audio} with ID: ${req.params.id}`, err);
  }
};

export const fetchAudio = async (req, dbName) => {
  if (dbName === "ALL") {
    const jsrAudio = await fetchAudio(req, JSR_DB);
    const jsrfAudio = await fetchAudio(req, JSRF_DB);
    const audio = [...jsrAudio, ...jsrfAudio];
    return audio;
  }

  return await performDBAction(
    Actions.fetchWithQuery,
    dbName,
    Audio,
    null,
    req?.query
  );
};
