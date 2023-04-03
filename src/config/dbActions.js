import { ObjectId } from "mongodb";

export const Actions = {
  fetchAll: async (client, dbName, collectionName) => { return await client.db(dbName).collection(collectionName).find({}).toArray() },
  fetchById: async (client, dbName, collectionName, id) => { return await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(id) }) },
}
