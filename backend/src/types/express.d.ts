import { Request } from "express";
import type { AuthObject } from "@clerk/express";

import { Request } from "express";
import type { AuthObject } from "@clerk/express";

export interface AuthUser {
  userId?: string; //auth provider user id
  email?: string;
  provider?: string;
  emailVerified?: boolean;
  appUserId?: string;
  username?: string;
  organization?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      auth?: () => Promise<AuthObject>; // clerk middleware will add if user session exists
    }
  }
}

export {};
