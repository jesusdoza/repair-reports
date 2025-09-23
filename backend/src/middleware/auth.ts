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

export default {
  //loads clerk auth into req.auth
  clerkAuthMiddleware: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    //user has already been loaded elsewhere
    if (req?.user) return next();

    try {
      const middleware = clerkMiddleware();
      middleware(req, res, next);
    } catch (error) {
      console.log("clerkauthMiddleware failed : ", error);
      next();
    }
  },

  //checks for req.user or req.auth if req.user not found load from the req.auth set by clerk
  clerkLoadUserMiddleware: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

        //no existing user auth account found in db load from clerk
        const externalAuthAccount = await clerkService.getUser(userId);

        if (externalAuthAccount) {
          // Associate the user with their external auth account
          req.user = externalAuthAccount;
        } else {
          // No external auth account found for this user continue without setting req.user and allow rest of middleware chain to handle it
          return next();
        }

        //find app user that matches external auth email
        const appUserAccount = await User.findOne({
          email: externalAuthAccount?.email,
        });

        //associate app user with external auth account
        if (appUserAccount) {
          req.user.appUserId = appUserAccount._id.toString();

          //save user auth account to db for future requests
          await UserAuthAccount.create({
            userId: appUserAccount._id,
            provider: authProvider,
            email: externalAuthAccount.email,
            providerUserId: externalAuthAccount.user_id,
          });

          next();
          return;
        }

        // No app user found, continue with request using basic external auth data
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
  },

  //verify user was authenticated and loaded into req else return 401
  verifyAuth: function (req: Request, res: Response, next: NextFunction) {
    if (req?.user) {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
};
