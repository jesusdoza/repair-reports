//middleware to verify user was loaded by some auth provider middleware
import type { Request, Response } from "express";

//middleware to ensure req.user is loaded
export default async function loadedUserMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  if (!req.user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  next();
}
