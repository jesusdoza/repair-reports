import {
  clerkClient,
  requireAuth,
  getAuth,
  verifyToken as clerkVerifyToken,
  clerkMiddleware,
} from "@clerk/express";

import User from "../models/User.js";
import { clerkService } from "../services/auth/ClerkService.js";
import type { NextFunction, Request, Response } from "express";
import UserAuthAccount from "../models/UserAuthAccount.js";
//middle ware verify user is authenticated

//auth user object in req.user

//loads clerk auth into req.auth
const clerkAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user has already been loaded elsewhere
  if (req?.user) return next();

  try {
    const middleware = clerkMiddleware();
    middleware(req, res, next);
  } catch (error) {
    console.log("clerkauthMiddleware failed : ", error);
    next();
  }
};

//checks for req.user or req.auth if req.user not found load from the req.auth set by clerk
const clerkLoadUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //previous middle ware has loaded basic user auth data into req
  if (!req?.user) return;

  // this middleware will load user profile and any other data needed into req.user
  //TODO get user from clerk auth details

  const authProvider = "clerk";

  //if using clerk auth clerk will add req.auth
  if (req?.auth) {
    try {
      const clerkAuthSession = await req.auth();

      //@ts-expect-error clerk middleware will set user
      const userId = clerkAuthSession?.userId || undefined;

      //find existing user auth account in db
      const existingUserAuthAccount = await UserAuthAccount.findOne({
        provider: authProvider,
        providerUserId: userId,
      }).lean();

      //case user auth account already exists in db set req.user and continue
      if (existingUserAuthAccount) {
        const user = {
          user_id: existingUserAuthAccount.providerUserId,
          provider: existingUserAuthAccount.provider,
          email: existingUserAuthAccount.email,
          email_verified: existingUserAuthAccount.emailVerified,
          app_user_id: existingUserAuthAccount.userId.toString(),
        };

        req.user = user;
        return next();
      }

      //no existing user found continue with middleware
      return next();
    } catch (error) {
      next();
      return;
    }
  } else {
    //not using clerk pass to next middleware
    next();
    return;
  }
};

//verify user was authenticated and loaded into req else return 401
const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req?.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { clerkAuthMiddleware, clerkLoadUserMiddleware, verifyAuth };
