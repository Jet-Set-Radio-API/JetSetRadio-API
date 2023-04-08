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

//Core DB
export const performCoreAction = async (action, collection, id, key, value) => {
  try {
    await client.connect();
    return await action(client, CORE_DB, collection, id, key, value);
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}

//JSR
export const performJSRAction = async (action, collection, id, key, value) => {
  try {
    await client.connect();
    return await action(client, JSR_DB, collection, id, key, value);
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}

//JSRF
export const performJSRFAction = async (action, collection, id, key, value) => {
  try {
    await client.connect();
    console.log('KEYYY: ' + key);
    return await action(client, JSRF_DB, collection, id, key, value);
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}


