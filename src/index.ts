import dotenv from 'dotenv';
import {MongoClient, MongoClientOptions} from 'mongodb';
dotenv.config();

const DB_HOST: string = process.env.DB_HOST as string;
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
const myClient: MongoClient = new MongoClient(DB_HOST, options);

const connect = async (client: MongoClient) => {
  try {
    const dbServer = await client.connect();
    return dbServer.db(process.env.DB);
  } catch (e) {
    throw e;
  }
};

connect(myClient)
  .then(db => db.listCollections().toArray())
  .then(collections => {
    collections.forEach(c => console.log(c.name));
  })
  .catch(err => console.log(err));
