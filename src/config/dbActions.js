import { ObjectId } from "mongodb";

export const Actions = {
  getCollectionsList: async (client, dbName) => { return await client.db(dbName).collections },
  fetchAll: async (client, dbName, collectionName, qps) => { return await client.db(dbName).collection(collectionName).find({}).toArray() },
  fetchWithQuery: async (client, dbName, collectionName, id, qps) => { return await client.db(dbName).collection(collectionName).find(qps).toArray() },
  fetchById: async (client, dbName, collectionName, id) => { return await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(id) }) },
}
