import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import {fetchRandom} from "./utilController.js";
import LOGGER from "../utils/logger.js";

const Character = "Character";
const {JSR_DB, JSRF_DB, BRC_DB} = Constants;

export const getAllCharacters = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const characters = await fetchCharacters(req, "ALL");
    if (sortByValue) {
      return res.send(characters.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send(characters);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Characters`, err);
    res.status(500).json({message: "Failed to fetch ALL characters", err: err});
  }
};

export const getRandomCharacter = async (req, res) => {
  try {
    res.send(await fetchRandom(req, Character));
  } catch (err) {
    LOGGER.error(`Could not fetch random character`, err);
    res.status(500).json({error: "Failed to fetch random character"});
  }
};

export const getJSRCharacters = async (req, res) => {
  try {
    res.send(await fetchCharacters(req, JSR_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Characters`, err);
    res.status(500).json({error: "Failed to fetch JSR characters"});
  }
};

export const getJSRFCharacters = async (req, res) => {
  try {
    res.send(await fetchCharacters(req, JSRF_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Characters`, err);
    res.status(500).json({error: "Failed to fetch JSRF characters"});
  }
};

export const getBRCCharacters = async (req, res) => {
  try {
    res.send(await fetchCharacters(req, BRC_DB));
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Characters`, err);
    res.status(500).json({error: "Failed to fetch BRC characters"});
  }
};

export const getJSRCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (!id) {
      return res.status(400).json({error: "Missing character ID"});
    }
    res.send(await performDBAction(Actions.fetchById, JSR_DB, Character, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR Character With ID: ${id}`, err);
    res
      .status(500)
      .json({error: `Failed to fetch JSR character with ID ${id}`});
  }
};

export const getJSRFCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (!id) {
      return res.status(400).json({error: "Missing character ID"});
    }
    res.send(await performDBAction(Actions.fetchById, JSRF_DB, Character, id));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF Character With ID: ${id}`, err);
    res
      .status(500)
      .json({error: `Failed to fetch JSRF character with ID ${id}`});
  }
};

export const getBRCCharacterById = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (!id) {
      return res.status(400).json({error: "Missing character ID"});
    }
    res.send(await performDBAction(Actions.fetchById, BRC_DB, Character, id));
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Character With ID: ${id}`, err);
    res
      .status(500)
      .json({error: `Failed to fetch BRC character with ID ${id}`});
  }
};

export const fetchCharacters = async (req, dbName) => {
  if (dbName === "ALL") {
    const jsrCharacters = await fetchCharacters(req, JSR_DB);
    const jsrfCharacters = await fetchCharacters(req, JSRF_DB);
    const brcCharacters = await fetchCharacters(req, BRC_DB);
    const allCharacters = [
      ...jsrCharacters,
      ...jsrfCharacters,
      ...brcCharacters,
    ];
    return allCharacters;
  }

  return await performDBAction(
    Actions.fetchWithQuery,
    dbName,
    Character,
    null,
    req?.query
  );
};
