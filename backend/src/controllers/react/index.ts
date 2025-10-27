import type { Request, Response } from "express";
import path from "path";
const serveApp = (req: Request, res: Response) => {
  // res.send({ serveApp: "serve app" });
  res.sendFile(path.resolve("/public/react/index.html"));
};

export { serveApp };
