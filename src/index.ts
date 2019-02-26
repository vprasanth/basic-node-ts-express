import dotenv from 'dotenv';
import mongodb from 'mongodb';
dotenv.config();
const MongoClient = mongodb.MongoClient;
const DB_HOST = process.env.DB_HOST;
const options = {
  authSource: process.env.DB_AUTH_SOURCE,
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  readPreference: process.env.DB_READ_PREFERENCE,
  connectTimeoutMS: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS, 10),
  loggerLevel: process.env.DB_LOGGER_LEVEL,
  replicaSet: process.env.DB_REPLICASET,
  useNewUrlParser: true,
};

const connect = async (url, driver, options) => {
  const client = new driver.MongoClient(url, options);
  try {
    const dbServer = await client.connect();
    return dbServer.db(process.env.DB);
  } catch (e) {
    throw e;
  }
};

connect(
  DB_HOST,
  mongodb,
  options,
)
  .then(db => db.listCollections().toArray())
  .then(collections => {
    collections.forEach(c => console.log(c.name));
  })
  .catch(err => console.log(err));
