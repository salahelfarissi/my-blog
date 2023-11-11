import { MongoClient } from "mongodb";

let db;

async function connectToDb(callback) {
  const client = new MongoClient(
    `mongodb+srv://salaheddineelfarissi:${process.env.MONGO_PASSWORD}@blog.7oddi7r.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();
  db = client.db("react-blog-db");
  callback();
}

export { connectToDb, db };
