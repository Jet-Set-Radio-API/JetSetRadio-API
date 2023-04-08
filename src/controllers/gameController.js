import { performCoreAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import Constants from "../constants/constants.js";


const { Collections: { Game } } = Constants;

export const getAllGames = async (req, res) => {
  try {
    res.send(await performCoreAction(Actions.fetchAll, Game));
  } catch(err) {
    res.send(err);
  }
}

export const getGameById = async (req, res) => {
  try {
    res.send(await performCoreAction(Actions.fetchById, Game, req?.params?.id));
  } catch(err) {
    res.send(err);
  }
}