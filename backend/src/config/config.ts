const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  MONGO_SEARCH_INDEX: process.env.MONGO_SEARCH_INDEX || "reports",
  JWT_SECRET: process.env.JWT_SECRET, //jwt secret for signing

  //allowed origins for CORS
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  ORIGIN_LIST: process.env.ORIGIN_LIST || "http://localhost:5173",

  //   clerk
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
  CLERK_JWT_KEY: process.env.CLERK_JWT_KEY || "",

  //cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_CLOUD_KEY: process.env.CLOUDINARY_CLOUD_KEY || "",
  CLOUDINARY_CLOUD_SECRET: process.env.CLOUDINARY_CLOUD_SECRET || "",
  CLOUDINARY_CLOUD_FOLDER: process.env.CLOUDINARY_CLOUD_FOLDER || "repairs", //default folder
};

export default config;
