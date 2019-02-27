import {
  MongoClient,
  MongoClientOptions,
  Db,
  DbCollectionOptions,
  Collection,
} from 'mongodb';

const connect = async (
  url: string,
  options: MongoClientOptions,
): Promise<MongoClient> => {
  try {
    const client: MongoClient = new MongoClient(url, options);
    const dbServer = await client.connect();
    return dbServer;
  } catch (e) {
    throw e;
  }
};

const getDb = (client: MongoClient, dbName: string): Db => {
  return client.db(dbName);
};

const getCollection = (db: Db, collection: string): Collection => {
  return db.collection(collection);
};

export {connect, getDb, getCollection};
