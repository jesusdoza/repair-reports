function originAllowed() {
  const ORIGINS = process.env.origins_list;
  let parsedOrigins = [];
  try {
    const urlList = JSON.parse(ORIGINS);
    parsedOrigins = parsedOrigins.concat(urlList);
  } catch (error) {
    console.log("error parsing oringin List", error);
    parsedOrigins = [];
  }

  return parsedOrigins;
}

module.exports = { originAllowed };
