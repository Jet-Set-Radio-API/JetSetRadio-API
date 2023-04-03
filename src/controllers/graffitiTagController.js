import { performAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import Constants from "../constants/constants.js";
import LOGGER from "../utils/logger.js";


const { Databases: { JSR_DB, JSRF_DB }, Collections: { GraffitiTag }} = Constants;

export const getAllGraffitiTags = async (req, res) => {
  try {
    const jsrTags = await performAction(Actions.fetchAll, JSR_DB, GraffitiTag);
    const jsrfTags = await performAction(Actions.fetchAll, JSRF_DB, GraffitiTag);
    res.send([...jsrTags, ...jsrfTags]);
  } catch(err) {
    LOGGER.error(`Could not fetch ALL GraffitiTags \n${err}`);
  }
}

export const getJSRGraffitiTags = async (req, res) => {
  try {
    res.send(await performAction(Actions.fetchAll, JSR_DB, GraffitiTag));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR GraffitiTags \n${err}`);
  }
}

export const getJSRFGraffitiTags = async (req, res) => {
  try {
    res.send(await performAction(Actions.fetchAll, JSRF_DB, GraffitiTag));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTags \n${err}`)
  }
}

export const getJSRGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    console.log(tagId);
    res.send(await performAction(Actions.fetchById, JSR_DB, GraffitiTag, tagId));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR GraffitiTag With ID: ${tagId} \n${err}`);
  }
}

export const getJSRFGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    res.send(await performAction(Actions.fetchById, JSRF_DB, GraffitiTag, tagId));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTag With ID: ${tagId} \n${err}`);
  }
}