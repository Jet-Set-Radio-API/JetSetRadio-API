import {MongoClient} from "mongodb";
import {ObjectId} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

import Constants from "../constants/dbConstants.js";
import LOGGER from "../utils/logger.js";

const {CORE_DB} = Constants;

/* Database Connections */
const client = new MongoClient(process.env.MONGO_URI);
let isConnected = false;

export const connectToDb = async () => {
  if (isConnected) {
    return client; // reuse existing connection
  }
  try {
    await client.connect();
    isConnected = true;
    LOGGER.info("✅ Connected to MongoDB");
    return client;
  } catch (err) {
    LOGGER.error("❌ Failed to connect to MongoDB", err);
    throw err;
  }
};

export const performAdminAction = async (action, username) => {
  try {
    await connectToDb();
    return await action(client, CORE_DB, "Admin", username);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const performDBAction = async (action, dbName, collection, id, qps) => {
  try {
    await connectToDb();
    const queryActions = [getSortQuery(qps), getLimitSize(qps)];
    return await action(
      client,
      dbName,
      collection,
      id,
      getQueryObject(qps),
      queryActions
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const listCollections = async (dbName) => {
  try {
    await connectToDb();
    return await client.db(dbName).listCollections().toArray();
  } catch (err) {
    console.error(err);
    return err;
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
