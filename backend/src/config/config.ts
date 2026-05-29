const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.connect_string || "",
  MONGO_SEARCH_INDEX: process.env.MONGO_SEARCH_INDEX || "reports",
  JWT_SECRET: process.env.JWT_SECRET, //jwt secret for signing

  //allowed origins for CORS
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  ORIGIN_LIST: process.env.ORIGIN_LIST || "http://localhost:5173",

  //   clerk
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || undefined,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || undefined,
  CLERK_JWT_KEY: process.env.CLERK_JWT_KEY || undefined,

  //cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.cloud_name || undefined,
  CLOUDINARY_CLOUD_KEY: process.env.cloud_key || undefined,
  CLOUDINARY_CLOUD_SECRET: process.env.cloud_secret || undefined,
  CLOUDINARY_CLOUD_FOLDER: process.env.cloud_folder || "repairs", //default folder
};

if (!config.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

if (
  !config.CLOUDINARY_CLOUD_FOLDER ||
  !config.CLOUDINARY_CLOUD_NAME ||
  !config.CLOUDINARY_CLOUD_KEY ||
  !config.CLOUDINARY_CLOUD_SECRET
) {
  throw new Error(
    "Cloudinary configuration is incomplete in environment variables",
  );
}

export default config;
