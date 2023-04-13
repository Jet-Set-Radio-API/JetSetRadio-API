import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

import LOGGER from '../utils/logger.js';
import Constants from '../constants/constants.js';


const { Databases: { CORE_DB, JSR_DB, JSRF_DB }} = Constants

const buildMongoUri = () => {
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASS;
  const clusterName = process.env.MONGO_CLUSTER;
  const domainName = process.env.MONGO_DOMAIN;
  if (!user) {
    return LOGGER.error(`Invalid admin user found while building mongo uri`);
  }
  if (!password) {
    return LOGGER.error(`Invalid admin password found while building mongo uri`);
  }
  if (!clusterName) {
    return LOGGER.error(`Invalid cluster name found while building mongo uri`);
  }
  if (!domainName) {
    return LOGGER.error(`Invalid domain name found while building mongo uri`);
  }
  return `mongodb+srv://${user}:${password}@${clusterName}.${domainName}?retryWrites=true&w=majority`;
}

const client = new MongoClient(buildMongoUri());

export const performCoreAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    return await action(client, CORE_DB, collection, id, getQueryObject(qps));
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}

export const performJSRAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    return await action(client, JSR_DB, collection, id, getQueryObject(qps));
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}

export const performJSRFAction = async (action, collection, id, qps) => {
  try {
    await client.connect();
    return await action(client, JSRF_DB, collection, id, getQueryObject(qps));
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}

export const listCollections = async (dbName) => {
  try {
    await client.connect();
    return await client.db(dbName).listCollections().toArray();
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}

// Prepare the queryParameters as one single object for mongoDB query
const getQueryObject = (qps) => {
  if (qps) {
    const queryMap = {};
    for (let [key, value] of Object.entries(qps)) {
      if (typeof value === String && value.includes(',')) {
        value = value.split(',')
        queryMap[key] = {$all: value}; // Uses AND currently...
      } else {
        queryMap[key] = value;
      }
    }
    return queryMap;
  }
  return {};
}

