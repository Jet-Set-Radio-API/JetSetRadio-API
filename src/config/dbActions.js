import { ObjectId } from "mongodb";

export const Actions = {
  getCollectionsList: async (client, dbName) => { return await client.db(dbName).collections },
  fetchAll: async (client, dbName, collectionName, id, qps, sortValue) => { return await client.db(dbName).collection(collectionName).find({}).sort(sortValue).toArray() },
  fetchWithQuery: async (client, dbName, collectionName, id, qps, queryActions) => { return await client.db(dbName).collection(collectionName).find(qps).sort(queryActions[0]).limit(queryActions[1]).toArray() },
  fetchById: async (client, dbName, collectionName, id) => { return await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(id) }) },
  fetchAdmin: async (client, dbName, collectionName, username) => { return await client.db(dbName).collection(collectionName).findOne({ username: username }) },
  fetchRandom: async (client, dbName, collectionName, count) => { return await client.db(dbName).collection(collectionName).aggregate([{ $sample: { size: count } }]).toArray(); }
}
