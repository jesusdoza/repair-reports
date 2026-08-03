import { clerkMiddleware, clerkClient } from "@clerk/express";

import type { NextFunction, Request, Response } from "express";
import UserAuthAccount from "../models/UserAuthAccount.js";
import type { AuthUser } from "../types/express.js";
import Member from "../models/Member.js";

import mongoose from "mongoose";
import { Repair } from "../models/Repair.js";
import User from "../models/User.js";
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
  next: NextFunction,
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
      if (!userId) {
        next();
        return;
      }
      const clerkUser = await clerkClient.users.getUser(userId);
      //find existing user auth account in db
      const existingUserAuthAccount = await UserAuthAccount.findOne({
        provider: authProvider,
        providerUserId: userId,
      }).lean();

      const appUser = await User.findOne({
        email: clerkUser.primaryEmailAddress?.emailAddress,
      }).lean();

      //no info at all about user in db create new user auth account and app user if needed
      if (!existingUserAuthAccount && !appUser) {
        //find existing app user by email from clerk user info

        //no existing user auth account found in db
        //get user info from clerk and create new user auth account in db
        // const existingAppUser = await User.findOne({
        //   email: clerkUser.primaryEmailAddress?.emailAddress,
        // }).lean();

        // if (existingAppUser) {
        //   //create new user auth account in db for existing app user

        //   const newUserAuthAccount = await UserAuthAccount.create({
        //     userId: existingAppUser._id,
        //     provider: authProvider,
        //     providerUserId: userId,
        //     email: clerkUser.primaryEmailAddress?.emailAddress || "",
        //     emailVerified:
        //       !!clerkUser.primaryEmailAddress?.verification || false,
        //   });
        // }

        // if (!clerkUser.primaryEmailAddress?.emailAddress) {
        //   return res.status(400).json({ message: "User email not found" });
        // }

        //TODO create new user in db
        let newAppUser = undefined;
        try {
          newAppUser = await User.create({
            email: clerkUser.primaryEmailAddress?.emailAddress,
            roles: ["user"],
            isActive: true,
            username:
              clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress,
          });
        } catch (error) {
          // console.error("Error creating new app user: ", error);
          next();
          return;
        }

        //TODO create new user auth account in db

        try {
          const newUserAuthAccount = await UserAuthAccount.create({
            userId: newAppUser._id,
            provider: authProvider,
            providerUserId: userId,
            email: clerkUser.primaryEmailAddress?.emailAddress || "",
            emailVerified:
              !!clerkUser.primaryEmailAddress?.verification || false,
          });

          console.log("newUserAuthAccount : ", newUserAuthAccount);
        } catch (error) {
          // console.error("Error creating new user auth account: ", error);
          return res
            .status(500)
            .json({ message: "Error creating user account" });
        }
      }
      //app user by email exists but no user auth account linked to it create new user auth account in db
      else if (appUser && !existingUserAuthAccount) {
        //case user under the email exists but not auth account linked to it
        //case: failed to create user auth account for existing app user in previous login attempt
        //case: user had existing app user account but never logged in with clerk auth before
        //case: user had existing app user account but logged in with different auth provider before
        try {
          const newUserAuthAccount = await UserAuthAccount.create({
            userId: appUser._id,
            provider: authProvider,
            providerUserId: userId,
            email: clerkUser.primaryEmailAddress?.emailAddress || "",
            emailVerified:
              !!clerkUser.primaryEmailAddress?.verification || false,
          });

          // console.log("newUserAuthAccount : ", newUserAuthAccount);
        } catch (error) {
          //todo remove this console log in production
          console.error("Error creating new user auth account: ", error);
          return res
            .status(500)
            .json({ message: "Error creating user account" });
        }
      }

      //case user auth account already exists in db set req.user and continue
      else if (existingUserAuthAccount) {
        // // await Member.create({
        // //   roles: ["member"],
        // //   username: "testdoza",
        // //   user: existingUserAuthAccount.userId,
        // //   organization: new mongoose.Types.ObjectId("68ea9a6a29e8a2bfe9b83c04"),
        // // });

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
