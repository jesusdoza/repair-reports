import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;
let uriEnv = "";

export const setupDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();
  uriEnv = uri;

  if (mongoose.connection.readyState === 1) {
    console.log("Mongoose is already connected");
  } else {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return uri;
};

export const teardownDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export { uriEnv };
