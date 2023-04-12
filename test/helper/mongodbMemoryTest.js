import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let mongoDB;
let client;

export const connect = async () => {
  mongoDB = await MongoMemoryServer.create();
  const uri = mongoDB.getUri();
  client = new MongoClient(uri);
  await client.connect();
}

export const disconnect = async () => {
  await client.close();
  await mongoDB.stop();
}
