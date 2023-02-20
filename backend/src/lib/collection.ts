import { InsertOneOptions } from 'mongodb';
import { connect } from './connect';

export function generateId() {
  return (
    new Date().getTime().toString(36) +
    Math.floor(Math.random() * 9999).toString(36)
  );
}

export async function insertOne<T>(
  collectionName: string,
  object: T,
  options?: InsertOneOptions
) {
  const db = await connect();
  const collection = db.collection(collectionName);
  return await collection.insertOne(object, options);
}
