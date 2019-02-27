import dotenv from 'dotenv';
dotenv.config();

import {MongoClientOptions, Cursor} from 'mongodb';
import {connect, getDb, getCollection} from './lib/db';

const DB_HOST: string = process.env.DB_HOST as string;
const DB_NAME: string = process.env.DB as string;

const options: MongoClientOptions = {
  authSource: process.env.DB_AUTH_SOURCE,
  auth: {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
  },
  readPreference: process.env.DB_READ_PREFERENCE,
  connectTimeoutMS: parseInt(
    process.env.DB_CONNECTION_TIMEOUT_MS as string,
    10,
  ),
  loggerLevel: process.env.DB_LOGGER_LEVEL,
  replicaSet: process.env.DB_REPLICASET,
  useNewUrlParser: true,
};

(async () => {
  const client = await connect(
    DB_HOST,
    options,
    '_systemdev1',
  );
  try {
    const db = getDb(client, '_systemdev1');
    const collection = getCollection(db, 'subscribers');
    const count = await collection.countDocuments();
    console.log(count);
  } catch (e) {
    throw e;
  }
});
