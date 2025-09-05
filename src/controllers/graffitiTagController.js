import Constants from "../constants/dbConstants.js";
import {Actions} from "../config/dbActions.js";
import {performDBAction} from "../config/db.js";
import {sortObjects} from "../utils/utility.js";
import LOGGER from "../utils/logger.js";

const GraffitiTag = "GraffitiTag";
const {JSR_DB, JSRF_DB} = Constants;

export const getAllGraffitiTags = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const jsrTags = await fetchJSRTags(req);
    const jsrfTags = await fetchJSRFTags(req);
    if (sortByValue) {
      const tags = [...jsrTags, ...jsrfTags];
      return res.send(tags.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send([...jsrTags, ...jsrfTags]);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL GraffitiTags`, err);
    res
      .status(500)
      .json({message: "Failed to fetch ALL GraffitiTags", err: err});
  }
};

export const getJSRGraffitiTags = async (req, res) => {
  try {
    res.send(await fetchJSRTags(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSR GraffitiTags`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSR GraffitiTags", err: err});
  }
};

export const getJSRFGraffitiTags = async (req, res) => {
  try {
    res.send(await fetchJSRFTags(req));
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTags`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSRF GraffitiTags", err: err});
  }
};

export const getJSRGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    res.send(
      await performDBAction(Actions.fetchById, JSR_DB, GraffitiTag, tagId)
    );
  } catch (err) {
    LOGGER.error(`Could not fetch JSR GraffitiTag With ID: ${tagId}`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSR GraffitiTag By ID", err: err});
  }
};

export const getJSRFGraffitiTagById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    res.send(
      await performDBAction(Actions.fetchById, JSRF_DB, GraffitiTag, tagId)
    );
  } catch (err) {
    LOGGER.error(`Could not fetch JSRF GraffitiTag With ID: ${tagId}`, err);
    res
      .status(500)
      .json({message: "Failed to fetch JSRF GraffitiTag By ID", err: err});
  }
};

export const fetchJSRTags = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      JSR_DB,
      GraffitiTag,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, JSR_DB, GraffitiTag, null);
};

export const fetchJSRFTags = async (req) => {
  if (req?.query) {
    return await performDBAction(
      Actions.fetchWithQuery,
      JSRF_DB,
      GraffitiTag,
      null,
      req?.query
    );
  }
  return await performDBAction(Actions.fetchAll, JSRF_DB, GraffitiTag, null);
};
