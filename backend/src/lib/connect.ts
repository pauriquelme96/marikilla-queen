import { Db, MongoClient } from 'mongodb';
import { MONGO_DB_NAME, MONGO_URL } from '../env';

let dbInstance: Db;
const client = new MongoClient(MONGO_URL);

export async function connect() {
  if (dbInstance) return dbInstance;
  await client.connect();
  return (dbInstance = client.db(MONGO_DB_NAME));
}
