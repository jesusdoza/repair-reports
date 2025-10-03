import mongoose from "mongoose";

//connect mongoose with mongodb connection string

const connectDB = async () => {
  const mongoUri = process.env.connect_string;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  try {
    const conn = await mongoose.connect(mongoUri, {}, (err) => {
      if (err) throw err;
    });

    // console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("error a dbM.js", error);
    process.exit(1);
  }
};

export default connectDB;
