import { ObjectId } from "mongodb";

export const Actions = {
  fetchAll: async (client, dbName, collectionName) => { return await client.db(dbName).collection(collectionName).find({}).toArray() },
  fetchAllByKeyAndValue: async (client, dbName, collectionName, id, key, value) => { 
    const songs = await client.db(dbName).collection(collectionName).find({ [key]: value }).toArray();
    console.log(`dbName: [${dbName}] - collection: [${collectionName}] - key: [${key}] - value: [${value}]`);
    console.log("songs: ")
    console.log(songs);
    return await client.db(dbName).collection(collectionName).find({ [key]: value }).toArray() 
  },
  fetchById: async (client, dbName, collectionName, id) => { return await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(id) }) },
}
