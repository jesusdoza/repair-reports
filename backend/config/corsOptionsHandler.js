function corsOptionsHandler(req, callback) {
  const ORIGINS = process.env.origins_list;
  let urlList = [];
  const reqOrigin = String(req.header("Origin"));
  let isAllowed = false;

  try {
    urlList = urlList.concat(JSON.parse(ORIGINS));
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
