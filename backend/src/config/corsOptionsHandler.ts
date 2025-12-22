import type { Request } from "express";

function corsOptionsHandler(req: Request, callback: Function) {
  const ORIGINS = process.env.origins_list;
  const NODE_ENV = process.env.NODE_ENV;
  let urlList: string[] = [];
  const reqOrigin = String(req.header("Origin"));
  let isAllowed = false;

  if (NODE_ENV === "development") {
    callback(null, { origin: true, credentials: true });
    return;
  }
  try {
    if (!ORIGINS) throw new Error("no origins provided");
    urlList = urlList.concat(ORIGINS.split(","));
  } catch (error) {
    console.log("error parsing origin List", error);
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

export { corsOptionsHandler };
