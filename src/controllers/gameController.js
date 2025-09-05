import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";

const Game = "Game";
const {CORE_DB} = Constants;

export const getAllGames = async (req, res) => {
  try {
    res.send(await fetchGames(req?.query));
  } catch (err) {
    res.status(500).send("Error fetching ALL Games", err);
  }
};

export const getGameById = async (req, res) => {
  try {
    res.send(await fetchGameById(req?.params?.id));
  } catch (err) {
    res.send(`Error fetching game by ID ${req?.params?.id}`, err);
  }
};

export const fetchGames = async (query) => {
  return await performDBAction(
    Actions.fetchWithQuery,
    CORE_DB,
    Game,
    null,
    query
  );
};

export const fetchGameById = async (id) => {
  return await performDBAction(Actions.fetchById, CORE_DB, Game, id);
};
