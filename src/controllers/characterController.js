import {
  performJSRAction,
  performJSRFAction,
  performBRCAction,
} from "../config/db.js";
import {Actions} from "../config/dbActions.js";
import LOGGER from "../utils/logger.js";
import {sortObjects} from "../utils/utility.js";

const Character = "Character";

export const getAllCharacters = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const jsrCharacters = await fetchJSRCharacters(req);
    const jsrfCharacters = await fetchJSRFCharacters(req);
    const brcCharacters = await fetchBRCCharacters(req);
    if (sortByValue) {
      const characters = [
        ...jsrCharacters,
        ...jsrfCharacters,
        ...brcCharacters,
      ];
      return res.send(characters.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send([...jsrCharacters, ...jsrfCharacters, ...brcCharacters]);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Characters \n${err}`);
  }
};

export const getJSRCharacters = async (req, res) => {
  try {
    res.send(await fetchJSRCharacters(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Characters \n${err}`);
  }
};

export const getJSRFCharacters = async (req, res) => {
  try {
    res.send(await fetchJSRFCharacters(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Characters \n${err}`);
  }
};

export const getJSRCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRAction(Actions.fetchById, Character, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Character With ID: ${id} \n${err}`);
  }
};

export const getJSRFCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRFAction(Actions.fetchById, Character, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Character With ID: ${id} \n${err}`);
  }
};

export const fetchJSRCharacters = async (req) => {
  return await performJSRAction(
    Actions.fetchWithQuery,
    Character,
    null,
    req?.query
  );
};

export const fetchJSRFCharacters = async (req) => {
  return await performJSRFAction(
    Actions.fetchWithQuery,
    Character,
    null,
    req?.query
  );
};

export const fetchBRCCharacters = async (req) => {
  return await performBRCAction(
    Actions.fetchWithQuery,
    Character,
    null,
    req?.query
  );
};
