import { performAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import Constants from "../constants/constants.js";


const { Databases: { CORE_DB }, Collections: { Game } } = Constants;

export const getAllGames = async (req, res) => {
  try {
    res.send(await performAction(Actions.fetchAll, CORE_DB, Game));
  } catch(err) {
    res.send(err);
  }
}

export const getGameById = async (req, res) => {
  try {
    res.send(await performAction(Actions.fetchById, CORE_DB, Game, req?.params?.id));
  } catch(err) {
    res.send(err);
  }
}