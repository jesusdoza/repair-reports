// // setupTests.ts
// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";

// let mongoServer: MongoMemoryServer;

// export const setupDatabase = async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri);
// };

// export const teardownDatabase = async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// };
