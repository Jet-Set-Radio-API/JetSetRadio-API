import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


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

export const performAction = async (action, db, collection, id, key, value) => {
  try {
    await client.connect();
    return await action(client, db, collection, id, key, value);
  } catch(err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}


