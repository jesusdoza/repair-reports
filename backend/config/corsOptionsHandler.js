function corsOptionsHandler() {
  const ORIGINS = process.env.origins_list;
  let allowedOrigins = [];

  try {
    const urlList = JSON.parse(ORIGINS);
    allowedOrigins = allowedOrigins.concat(urlList);
  } catch (error) {
    console.log("error parsing oringin List", error);
    allowedOrigins = false;
  }

  return { origin: allowedOrigins, credentials: true };
}

module.exports = { corsOptionsHandler };
