function corsOptionsHandler(req, callback) {
  const ORIGINS = process.env.origins_list;
  const NODE_ENV = process.env.NODE_ENV;
  let urlList = [];
  const reqOrigin = String(req.header("Origin"));
  let isAllowed = false;

  if (NODE_ENV === "development") {
    callback(null, { origin: true, credentials: true });
    return;
  }
  try {
    urlList = urlList.concat(ORIGINS.split(","));

    console.log("urlList", urlList);
  } catch (error) {
    console.log("error parsing oringin List", error);
    isAllowed = false;
    callback(new Error("origin not allowed"));
  }

  //check urlist against allowed origins
  const matchedUrl = urlList.findIndex((url) => {
    if (reqOrigin.startsWith(url)) {
      return true;
    }
    return false;
  });

  if (matchedUrl !== -1) {
    isAllowed = true;
  }

  callback(null, { origin: isAllowed, credentials: true });
}

module.exports = { corsOptionsHandler };
