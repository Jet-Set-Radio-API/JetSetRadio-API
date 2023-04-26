import { performJSRAction, performJSRFAction } from "../config/db.js";
import { Actions } from "../config/dbActions.js";
import LOGGER from "../utils/logger.js";


const Location = 'Location';
const Level = 'Level';

export const getLocations = async (req, res) => {
  try {
    const jsrLocations = await fetchJSRLocations(req);
    const jsrfLocations = await fetchJSRFLocations(req);
    res.send([...jsrLocations, ...jsrfLocations]);
  } catch(err) {
    LOGGER.error(`Could not fetch ALL Locations \n${err}`);
  }
}

export const getJSRLocations = async (req, res) => {
  try {
    res.send(await fetchJSRLocations(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR Locations \n${err}`);
  }
}

export const getJSRFLocations = async (req, res) => {
  try {
    res.send(await fetchJSRFLocations(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF Locations \n${err}`)
  }
}

export const getJSRLocationById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRAction(Actions.fetchById, Location, id));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR Location With ID: ${id} \n${err}`);
  }
}

export const getJSRFLocationById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRFAction(Actions.fetchById, Location, id));
  } catch(err) {
    LOGGER.error(`Could not fetch JSRF Location With ID: ${id} \n${err}`);
  }
}

export const getLevels = async (req, res) => {
  try {
    res.send(await fetchJSRLevels(req));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR Levels \n${err}`);
  }
}

export const getLevelById = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.send(await performJSRAction(Actions.fetchById, Level, id));
  } catch(err) {
    LOGGER.error(`Could not fetch JSR Level with ID ${id} \n${err}`);
  }
}


export const fetchJSRLevels = async (req) => {
  if (req?.query) {
    return await performJSRAction(Actions.fetchWithQuery, Level, null, req?.query);
  }
  return await performJSRAction(Actions.fetchAll, Level, null);
}

export const fetchJSRLocations = async (req) => {
  if (req?.query) {
    return await performJSRAction(Actions.fetchWithQuery, Location, null, req?.query);
  }
  return await performJSRAction(Actions.fetchAll, Location, null);
}

export const fetchJSRFLocations = async (req) => {
  if (req?.query) {
    return await performJSRFAction(Actions.fetchWithQuery, Location, null, req?.query);
  }
  return await performJSRFAction(Actions.fetchAll, Location, null);
}