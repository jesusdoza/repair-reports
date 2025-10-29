import { Request } from "express";
import type { AuthObject } from "@clerk/express";

import { Request } from "express";
import type { AuthObject } from "@clerk/express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId?: string; //auth provider user id
        email?: string;
        provider?: string;
        emailVerified?: boolean;
        appUserId?: string;
      };
      auth?: () => Promise<AuthObject>; // clerk middleware will add if user session exists
    }
  }
}

export {};
