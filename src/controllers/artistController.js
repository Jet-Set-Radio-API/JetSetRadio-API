import {ObjectId} from "mongodb";
import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import LOGGER from "../utils/logger.js";

const Artist = "Artist";
const Song = "Song";
const {CORE_DB, JSR_DB, JSRF_DB, BRC_DB} = Constants;

export const getArtists = async (req, res) => {
  try {
    const artists = await fetchArtists(req);
    if (artists) {
      return res.send(artists.length === 1 ? artists[0] : artists);
    }
    res.status(404).send();
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Artists`, err);
    res.status(500).send(`Could not fetch ALL Artists due to error`, err);
  }
};

export const getArtistById = async (req, res) => {
  try {
    const artist = await performDBAction(
      Actions.fetchById,
      CORE_DB,
      Artist,
      req?.params?.id
    );
    if (artist) {
      return res.send(artist);
    }
    res
      .status(404)
      .send(`Artist Resource could not be found at requested location`);
  } catch (err) {
    LOGGER.error(`Could not fetch Artist by Id ${req?.params?.id}`, err);
    res
      .status(500)
      .send(`Could not fetch Artist with ID: ${req.params.id}`, err);
  }
};

export const getSongsByArtist = async (req, res) => {
  try {
    const artistId = req?.params?.id;
    if (!artistId) {
      return res.status(400).send("Invalid ArtistId");
    }
    res.send(await fetchSongsByArtistId(artistId));
  } catch (err) {
    LOGGER.error(`Could not fetch Songs By Artist ${req?.params?.id}`, err);
    res
      .status(500)
      .send(`Could not fetch Songs by Artist with ID: ${req.params.id}`, err);
  }
};

export const fetchArtists = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      CORE_DB,
      Artist,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, CORE_DB, Artist, null);
};

export const fetchSongsByArtistId = async (artistId) => {
  const songs = [];
  const jsrSongs = await performDBAction(
    Actions.fetchWithQuery,
    JSR_DB,
    Song,
    null,
    {
      artistId: new ObjectId(artistId),
    }
  );
  const jsrfSongs = await performDBAction(
    Actions.fetchWithQuery,
    JSRF_DB,
    Song,
    null,
    {artistId: new ObjectId(artistId)}
  );
  const brcSongs = await performDBAction(
    Actions.fetchWithQuery,
    BRC_DB,
    Song,
    null,
    {
      artistId: new ObjectId(artistId),
    }
  );
  if (jsrSongs && jsrSongs.length > 0) {
    songs.push(jsrSongs);
  }
  if (jsrfSongs && jsrfSongs.length > 0) {
    songs.push(jsrfSongs);
  }
  if (brcSongs && brcSongs.length > 0) {
    songs.push(brcSongs);
  }
  return songs.flat(1);
};
