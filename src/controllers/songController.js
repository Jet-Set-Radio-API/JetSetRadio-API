import Constants from "../constants/constants.js";
import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";

const {Collections: {Song}} = Constants;


export const getSongs = async (req, res) => {
  try {
    const jsrSongs = await performJSRAction(Actions.fetchAll, Song);
    const jsrfSongs = await performJSRFAction(Actions.fetchAll, Song);
    if (jsrSongs && jsrfSongs) {
      return res.send([...jsrSongs, ...jsrfSongs]);
    }
    res.status(404).send();
  } catch(err) {
    res.status(500).send(`Could not fetch ALL SONGS \n${err}`);
  }
}

export const getJSRSongs = async (req, res) => {
  try {
    const jsrSongs = await performJSRAction(Actions.fetchAll, Song);
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
    const jsrSong = await performJSRAction(Actions.fetchById, Song, req?.params?.id);
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
    let jsrfSongs = [];
    const chapters = req?.query?.chapters.split(',');
    for (const chapter of chapters) {
      if (chapter) {
        const matchingSongs = await performJSRFAction(Actions.fetchAllByKeyAndValue, Song, null, 'chapters', chapter);
        for (const matchingSong of matchingSongs) {
          // Prevent adding duplicates to response
          if (!jsrfSongs.some(song => song.name === matchingSong.name)) {
            jsrfSongs.push(...matchingSongs);
          }
        }
      }
    }
    if (jsrfSongs) {
      return res.send(jsrfSongs);
    }
    res.status(404).send();
  } catch(err) {
    res.status(500).send(`Could not fetch JSRF SONGS \n${err}`);
  }
}

export const getJSRFSongById = async (req, res) => {
  try {
    const jsrfSong = await performJSRFAction(Actions.fetchById, Song, req?.params?.id);
    if (jsrfSong) {
      return res.send(jsrfSong);
    }
    res.status(404).send(`JSRF Song Resource could not be found at requested location`);
  } catch(err) {
    res.status(500).send(`Could not fetch JSRF SONG with ID: ${req.params.id} \n${err}`);
  }
}