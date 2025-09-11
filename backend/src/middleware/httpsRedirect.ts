import type { NextFunction, Request, Response } from "express";

//redirect user to HTTPS if request for HTTP
const httpsRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV !== "development") {
    const protocol = req.get("x-forwarded-proto");

    if (protocol !== "https")
      // the statement for performing our redirection
      return res.redirect("https://" + req.headers.host + req.url);
    else return next();
  } else return next();
};

export { httpsRedirect };
