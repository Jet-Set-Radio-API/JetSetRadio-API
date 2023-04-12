import Constants from "../constants/constants.js";
import { performCoreAction, performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import { ObjectId } from "mongodb";


const {Collections: {Artist, Song}} = Constants;

export const getArtists = async (req, res) => {
  try {
    const artists = await fetchArtists(req);
    if (artists) {
      return res.send(artists.length === 1 ? artists[0] : artists);
    } 
    res.status(404).send();
  } catch(err) {
    res.status(500).send(`Could not fetch ALL Artists due to error: \n${err}`);
  }
}

export const getArtistById = async (req, res) => {
  try {
    const artist = await performCoreAction(Actions.fetchById, Artist, req?.params?.id);
    if (artist) {
      return res.send(artist);
    }
    res.status(404).send(`Artist Resource could not be found at requested location`);
  } catch(err) {
    res.status(500).send(`Could not fetch Artist with ID: ${req.params.id} \n${err}`);
  }
}

export const getSongsByArtist = async (req, res) => {
  try {
    const artistId = req?.params?.id;
    if (!artistId) {
      return res.status(400).send('Invalid ArtistId');
    }
    res.send(await fetchSongsByArtistId(artistId));
  } catch(err) {
    res.status(500).send(`Could not fetch Songs by Artist with ID: ${req.params.id} \n${err}`);
  }
  
}


export const fetchArtists = async (req) => {
  if (req?.query) {
    return await performCoreAction(Actions.fetchWithQuery, Artist, null, req?.query);
  }
  return await performCoreAction(Actions.fetchAll, Artist, null);
}

export const fetchSongsByArtistId = async (artistId) => {
  const songs = [];
  const jsrSongs = await performJSRAction(Actions.fetchWithQuery, Song, null, { artistId: new ObjectId(artistId) });
  const jsrfSongs = await performJSRFAction(Actions.fetchWithQuery, Song, null, { artistId: new ObjectId(artistId) });
  if (jsrSongs && jsrSongs.length > 0) {
    songs.push(jsrSongs);
  }
  if (jsrfSongs && jsrfSongs.length > 0) {
    songs.push(jsrfSongs);
  }
  return songs.flat(1);
}