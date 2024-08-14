import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;
let uriEnv = "";

export const setupDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  uriEnv = uri;

  //   await mongoose.connect(uri);
  return uri;
};

export const teardownDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export { uriEnv };
