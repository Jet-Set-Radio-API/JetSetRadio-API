import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import LOGGER from "../utils/logger.js";
import { sortObjects } from "../utils/utility.js";


const GraffitiTag = 'GraffitiTag';

export const getAllGraffitiTags = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : 'asc';
    const jsrTags = await fetchJSRTags(req);
    const jsrfTags = await fetchJSRFTags(req);
    if (sortByValue) {
      const tags = [...jsrTags, ...jsrfTags];
      return res.send(tags.sort(sortObjects(sortByValue, sortOrder)));
    }
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

export const fetchJSRTags = async (req) => {
  if (req?.query) {
    return await performJSRAction(Actions.fetchWithQuery, GraffitiTag, null, req?.query);
  }
  return await performJSRAction(Actions.fetchAll, GraffitiTag, null);
}

export const fetchJSRFTags = async (req) => {
  if (req?.query) {
    return await performJSRFAction(Actions.fetchWithQuery, GraffitiTag, null, req?.query);
  }
  return await performJSRFAction(Actions.fetchAll, GraffitiTag, null);
}