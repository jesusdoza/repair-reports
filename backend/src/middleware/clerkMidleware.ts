// middleware to load clerk user info
import type { Request, Response } from "express";
import UserAuthAccount from "../models/UserAuthAccount.js";

export default async function middleware(
  req: Request,
  res: Response,
  next: Function
) {
  //load user info from clerk and attach to req.user
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next();
  }

  if (req.auth) {
    //if auth function exists, call it to get user info
    try {
      const clerkAuthSession = await req.auth();
      const authProvider = "clerk";

      //@ts-expect-error clerk middleware will set user
      const userId = clerkAuthSession?.userId || undefined;

      const existingUserAuthAccount = await UserAuthAccount.findOne({
        provider: authProvider,
        providerUserId: userId,
      }).lean();

      if (existingUserAuthAccount) {
        //load user data from existingUserAuthAccount
        const user = {
          userId: existingUserAuthAccount.providerUserId,
          provider: existingUserAuthAccount.provider,
          email: existingUserAuthAccount.email,
          emailVerified: existingUserAuthAccount.emailVerified,
          appUserId: existingUserAuthAccount.userId.toString(),
        };

        req.user = user;
        return next();
      } else {
        // No existing user found, continue with request
        return next();
      }
    } catch (error) {
      console.error("Error in clerk middleware:", error);
      return next();
    }
  }
}
