import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import Constants from "../constants/constants.js";
import LOGGER from "../utils/logger.js";


const { Collections: { GraffitiTag }} = Constants;

export const getAllGraffitiTags = async (req, res) => {
  try {
    const jsrTags = await fetchJSRTags(req);
    const jsrfTags = await fetchJSRFTags(req);
    res.send([...jsrTags, ...jsrfTags]);
  } catch(err) {
    LOGGER.error(`Could not fetch ALL GraffitiTags \n${err}`);
  }
}

export const getJSRGraffitiTags = async (req, res) => {
  try {
    res.send(await fetchJSRTags(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR GraffitiTags \n${err}`);
  }
}

export const getJSRFGraffitiTags = async (req, res) => {
  try {
    res.send(await fetchJSRFTags(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTags \n${err}`)
  }
}

export const getJSRGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
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

const fetchJSRTags = async (req) => {
  if (req?.query) {
    return await performJSRAction(Actions.fetchWithQuery, GraffitiTag, null, req?.query);
  }
  return await performJSRAction(Actions.fetchAll, GraffitiTag, null);
}

const fetchJSRFTags = async (req) => {
  if (req?.query) {
    return await performJSRFAction(Actions.fetchWithQuery, GraffitiTag, null, req?.query);
  }
  return await performJSRFAction(Actions.fetchAll, GraffitiTag, null);
}