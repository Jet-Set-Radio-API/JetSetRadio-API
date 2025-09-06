import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import {fetchRandom} from "./utilController.js";
import LOGGER from "../utils/logger.js";

const Song = "Song";
const {JSR_DB, JSRF_DB, BRC_DB} = Constants;

export const getSongs = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const songs = await fetchSongs(req, "ALL");
    if (sortByValue) {
      return res.send(songs.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send(songs);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Songs`, err);
    res.status(500).send(`Could not fetch ALL SONGS due to error:`, err);
  }
};

export const getRandomSong = async (req, res) => {
  try {
    res.send(await fetchRandom(req, Song));
  } catch (err) {
    LOGGER.error(`Could not fetch random song`, err);
    res.status(500).json({error: "Failed to fetch random song"});
  }
};

export const getJSRSongs = async (req, res) => {
  try {
    const jsrSongs = await fetchSongs(req, JSR_DB);
    if (jsrSongs) {
      return res.send(jsrSongs);
    }
    res.status(404).send();
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Songs`, err);
    res.status(500).send(`Could not fetch JSR SONGS`, err);
  }
};

export const getJSRSongById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const jsrSong = await performDBAction(Actions.fetchById, JSR_DB, Song, id);
    if (jsrSong) {
      return res.send(jsrSong);
    }
    res
      .status(404)
      .send(`JSR Song Resource could not be found at requested location`);
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Song by ID ${req?.params?.id}`, err);
    res
      .status(500)
      .send(`Could not fetch JSR SONG with ID: ${req.params.id}`, err);
  }
};

export const getJSRFSongs = async (req, res) => {
  try {
    const jsrfSongs = await fetchSongs(req, JSRF_DB);
    if (jsrfSongs) {
      return res.send(jsrfSongs);
    }
    res.status(404).send();
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Songs`, err);
    res.status(500).send(`Could not fetch JSRF Songs`, err);
  }
};

export const getJSRFSongById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const jsrfSong = await performDBAction(
      Actions.fetchById,
      JSRF_DB,
      Song,
      id
    );
    if (jsrfSong) {
      return res.send(jsrfSong);
    }
    res
      .status(404)
      .send(`JSRF Song Resource could not be found at requested location`);
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Song by ID`, err);
    res
      .status(500)
      .send(`Could not fetch JSRF SONG with ID: ${req.params.id}`, err);
  }
};

export const getBRCSongs = async (req, res) => {
  try {
    const brcSongs = await fetchSongs(req, BRC_DB);
    if (brcSongs) {
      return res.send(brcSongs);
    }
    res.status(404).send();
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Songs`, err);
    res.status(500).send(`Could not fetch BRC Songs`, err);
  }
};

export const getBRCSongById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const brcSong = await performDBAction(Actions.fetchById, BRC_DB, Song, id);
    if (brcSong) {
      return res.send(brcSong);
    }
    res
      .status(404)
      .send(`BRC Song Resource could not be found at requested location`);
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Song By Id`, err);
    res
      .status(500)
      .send(`Could not fetch BRC Song with ID: ${req.params.id}`, err);
  }
};

export const fetchSongs = async (req, dbName) => {
  if (dbName === "ALL") {
    const jsrSongs = await fetchSongs(req, JSR_DB);
    const jsrfSongs = await fetchSongs(req, JSRF_DB);
    const brcSongs = await fetchSongs(req, BRC_DB);
    const songs = [...jsrSongs, ...jsrfSongs, ...brcSongs];
    return songs;
  }

  return await performDBAction(
    Actions.fetchWithQuery,
    dbName,
    Song,
    null,
    req?.query
  );
};
