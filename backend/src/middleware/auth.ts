import { clerkMiddleware } from "@clerk/express";

import type { NextFunction, Request, Response } from "express";
import UserAuthAccount from "../models/UserAuthAccount.js";
import type { AuthUser } from "../types/express.js";
import Member from "../models/Member.js";
import mongoose from "mongoose";
import { Repair } from "../models/Repair.js";
//middle ware verify user is authenticated

//auth user object in req.user

//loads clerk auth into req.auth
// const clerkAuthMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   //user has already been loaded elsewhere
//   if (req?.user) return next();

//   try {
//     const middleware = clerkMiddleware();
//     middleware(req, res, next);
//   } catch (error) {
//     console.log("clerkauthMiddleware failed : ", error);
//     next();
//   }
// };

//checks for req.user or req.auth if req.user not found load from the req.auth set by clerk
const clerkLoadUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //previous middle ware has loaded basic user auth data into req
  if (req?.user) return next();

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
        // await Member.create({
        //   roles: ["member"],
        //   username: "testdoza",
        //   user: existingUserAuthAccount.userId,
        //   organization: new mongoose.Types.ObjectId("68ea9a6a29e8a2bfe9b83c04"),
        // });

        const membership = await Member.findOne({
          user: existingUserAuthAccount.userId,
        }).lean();

        const organization =
          membership?.organization?.toString() || "no organization";

        const user: AuthUser = {
          userId: existingUserAuthAccount.providerUserId,
          provider: existingUserAuthAccount.provider,
          email: existingUserAuthAccount.email,
          emailVerified: existingUserAuthAccount.emailVerified,
          appUserId: existingUserAuthAccount.userId.toString(),
          organization,
        };

        // await Repair.create({
        //   title: "test repair",
        //   organization: membership?.organization,
        //   createdBy: existingUserAuthAccount.userId,
        //   manufacturer: "test manufacturer",
        //   status: "pending",
        //   removed: false,
        //   visibility: "public",
        //   procedures: [],
        // });

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

export { clerkLoadUserMiddleware, verifyAuth };
