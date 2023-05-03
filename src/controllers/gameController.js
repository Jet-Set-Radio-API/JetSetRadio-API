import { performCoreAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";


const Game = 'Game';

export const getAllGames = async (req, res) => {
  try {
    res.send(await fetchGames(req?.query));
  } catch(err) {
    res.status(500).send(err);
  }
}

export const getGameById = async (req, res) => {
  try {
    res.send(await fetchGameById(req?.params?.id));
  } catch(err) {
    res.send(err);
  }
}


export const fetchGames = async (query) => {
  return await performCoreAction(Actions.fetchWithQuery, Game, null, query);
}

export const fetchGameById = async (id) => {
  return await performCoreAction(Actions.fetchById, Game, id)
}