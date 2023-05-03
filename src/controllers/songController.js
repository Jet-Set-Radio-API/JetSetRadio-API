import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import { sortObjects } from "../utils/utility.js";


const Song = 'Song';

export const getSongs = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : 'asc';
    const jsrSongs = await fetchJSRSongs(req);
    const jsrfSongs = await fetchJSRFSongs(req);
    if (sortByValue) {
      const songs = [...jsrSongs, ...jsrfSongs];
      return res.send(songs.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send([...jsrSongs, ...jsrfSongs]);
  } catch(err) {
    res.status(500).send(`Could not fetch ALL SONGS due to error: \n${err}`);
  }
}

export const getJSRSongs = async (req, res) => {
  try {
    const jsrSongs = await fetchJSRSongs(req);
    if (jsrSongs) {
      return res.send(jsrSongs);
    }
    res.status(404).send();
  } catch(err) {
    res.status(500).send(`Could not fetch JSR SONGS \n${err}`);
  }
}

export const getJSRSongById = async (req, res) => {
  try {
    const jsrSong = await performJSRAction(Actions.fetchById, Song, id);
    if (jsrSong) {
      return res.send(jsrSong);
    }
    res.status(404).send(`JSR Song Resource could not be found at requested location`);
  } catch(err) {
    res.status(500).send(`Could not fetch JSR SONG with ID: ${req.params.id} \n${err}`);
  }
}

export const getJSRFSongs = async (req, res) => {
  try {
    const jsrfSongs = await fetchJSRFSongs(req);
    if (jsrfSongs) {
      return res.send(jsrfSongs);
    }
    res.status(404).send();
  } catch(err) {
    res.status(500).send(`Could not fetch JSRF Songs \n${err}`);
  }
}

export const getJSRFSongById = async (req, res) => {
  try {
    const jsrfSong = await performJSRFAction(Actions.fetchById, Song, id);
    if (jsrfSong) {
      return res.send(jsrfSong);
    }
    res.status(404).send(`JSRF Song Resource could not be found at requested location`);
  } catch(err) {
    res.status(500).send(`Could not fetch JSRF SONG with ID: ${req.params.id} \n${err}`);
  }
}

export const fetchJSRSongs = async (req) => {
  return await performJSRAction(Actions.fetchWithQuery, Song, null, req?.query);
}
  
export const fetchJSRFSongs = async (req) => {
  return await performJSRFAction(Actions.fetchWithQuery, Song, null, req?.query);
}