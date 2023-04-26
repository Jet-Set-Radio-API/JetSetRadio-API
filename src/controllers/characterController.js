import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import Constants from "../constants/constants.js";
import LOGGER from "../utils/logger.js";


const { Collections: { Character }} = Constants;

export const getAllCharacters = async (req, res) => {
  try {
    const jsrCharacters = await fetchJSRCharacters(req);
    const jsrfCharacters = await fetchJSRFCharacters(req);
    res.send([...jsrCharacters, ...jsrfCharacters]);
  } catch(err) {
    LOGGER.error(`Could not fetch ALL Characters \n${err}`);
  }
}

export const getJSRCharacters = async (req, res) => {
  try {
    res.send(await fetchJSRCharacters(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR Characters \n${err}`);
  }
}

export const getJSRFCharacters = async (req, res) => {
  try {
    res.send(await fetchJSRFCharacters(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF Characters \n${err}`)
  }
}

export const getJSRCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRAction(Actions.fetchById, Character, id));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR Character With ID: ${id} \n${err}`);
  }
}

export const getJSRFCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRFAction(Actions.fetchById, Character, id));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF Character With ID: ${id} \n${err}`);
  }
}

export const fetchJSRCharacters = async (req) => {
  if (req?.query) {
    return await performJSRAction(Actions.fetchWithQuery, Character, null, req?.query);
  }
  return await performJSRAction(Actions.fetchAll, Character, null);
}

export const fetchJSRFCharacters = async (req) => {
  if (req?.query) {
    return await performJSRFAction(Actions.fetchWithQuery, Character, null, req?.query);
  }
  return await performJSRFAction(Actions.fetchAll, Character, null);
}