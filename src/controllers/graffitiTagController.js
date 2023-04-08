import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import Constants from "../constants/constants.js";
import LOGGER from "../utils/logger.js";


const { Collections: { GraffitiTag }} = Constants;

export const getAllGraffitiTags = async (req, res) => {
  try {
    const jsrTags = await performJSRAction(Actions.fetchAll, GraffitiTag);
    const jsrfTags = await performJSRFAction(Actions.fetchAll, GraffitiTag);
    res.send([...jsrTags, ...jsrfTags]);
  } catch(err) {
    LOGGER.error(`Could not fetch ALL GraffitiTags \n${err}`);
  }
}

export const getJSRGraffitiTags = async (req, res) => {
  try {
    res.send(await performJSRAction(Actions.fetchAll, GraffitiTag));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR GraffitiTags \n${err}`);
  }
}

export const getJSRFGraffitiTags = async (req, res) => {
  try {
    res.send(await performJSRFAction(Actions.fetchAll, GraffitiTag));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTags \n${err}`)
  }
}

export const getJSRGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    console.log(tagId);
    res.send(await performJSRAction(Actions.fetchById, GraffitiTag, tagId));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR GraffitiTag With ID: ${tagId} \n${err}`);
  }
}

export const getJSRFGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    res.send(await performJSRFAction(Actions.fetchById, GraffitiTag, tagId));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTag With ID: ${tagId} \n${err}`);
  }
}