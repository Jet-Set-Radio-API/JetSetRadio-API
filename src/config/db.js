import {MongoClient} from "mongodb";
import {ObjectId} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

import LOGGER from "../utils/logger.js";
import Constants from "../constants/dbConstants.js";

const {CORE_DB, JSR_DB, JSRF_DB, BRC_DB} = Constants;

const buildMongoUri = () => {
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASS;
  const clusterName = process.env.MONGO_CLUSTER;
  const domainName = process.env.MONGO_DOMAIN;
  if (!user) {
    return LOGGER.error(`Invalid admin user found while building mongo uri`);
  }
  if (!password) {
    return LOGGER.error(
      `Invalid admin password found while building mongo uri`
    );
  }
  if (!clusterName) {
    return LOGGER.error(`Invalid cluster name found while building mongo uri`);
  }
  if (!domainName) {
    return LOGGER.error(`Invalid domain name found while building mongo uri`);
  }
  return `mongodb+srv://${user}:${password}@${clusterName}.${domainName}?retryWrites=true&w=majority`;
};

const client = new MongoClient(buildMongoUri());

/* Database Connections */
export const performCoreAdminAction = async (action, username) => {
  try {
    await client.connect();
    return await action(client, CORE_DB, "Admin", username);
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
};

export const performCoreAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    const queryActions = [getSortQuery(qps), getLimitSize(qps)];
    return await action(
      client,
      CORE_DB,
      collection,
      id,
      getQueryObject(qps),
      queryActions
    );
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
};

export const performJSRAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    const queryActions = [getSortQuery(qps), getLimitSize(qps)];
    return await action(
      client,
      JSR_DB,
      collection,
      id,
      getQueryObject(qps),
      queryActions
    );
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
};

export const performJSRFAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    const queryActions = [getSortQuery(qps), getLimitSize(qps)];
    return await action(
      client,
      JSRF_DB,
      collection,
      id,
      getQueryObject(qps),
      queryActions
    );
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
};

export const performBRCAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    const queryActions = [getSortQuery(qps), getLimitSize(qps)];
    return await action(
      client,
      BRC_DB,
      collection,
      id,
      getQueryObject(qps),
      queryActions
    );
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
};

export const listCollections = async (dbName) => {
  try {
    await client.connect();
    return await client.db(dbName).listCollections().toArray();
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
};

const excludedKeys = ["sortBy", "orderBy", "filter", "page", "limit"];
const objectIdKeys = [
  "gameId",
  "locationId",
  "levelId",
  "graffitiTagId",
  "characterId",
  "artistId",
  "songId",
  "game.id",
  "location.id",
  "adjacentLocations.id",
  "level.id",
  "graffitiTag.id",
  "character.id",
  "artist.id",
  "song.id",
];

// Prepare the queryParameters as one single object for mongoDB query
const getQueryObject = (qps) => {
  if (qps) {
    const queryMap = {};

    /* Remove special keys that will be used for query suffix */
    excludedKeys.forEach((key) => delete qps[key]);

    /* Transform the user query object into a format MongoDB can understand */
    for (let [key, value] of Object.entries(qps)) {
      if (typeof value === String && value.includes(",")) {
        value = value.split(",");
        queryMap[key] = {$all: value}; // Uses AND currently...
      } else if (value === "true" || value === "false") {
        queryMap[key] = value === "true" ? true : false;
      } else if (typeof value === String && value.toLowerCase() === "female") {
        queryMap[key] = "Female";
      } else if (typeof value === String && value.toLowerCase() === "male") {
        queryMap[key] = "Male";
      } else if (objectIdKeys.includes(key) && ObjectId.isValid(value)) {
        queryMap[key] = new ObjectId(value);
      } else {
        queryMap[key] = value;
      }
    }
    return queryMap;
  }
  return {};
};

const getSortQuery = (query) => {
  const field = query?.sortBy;
  const order = query?.orderBy || "asc";
  const orderMap = {asc: 1, desc: -1};
  return field ? {[field]: orderMap[order]} : {};
};

const getLimitSize = (query) => {
  const limit = query?.limit || "0";
  return !isNaN(Number(limit)) && limit !== "0" ? Number(limit) : 0;
};
