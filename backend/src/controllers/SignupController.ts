import type { Request, Response } from "express";
import User from "../models/User.js";
import UserAuthAccount from "../models/UserAuthAccount.js";

export class SignupController {
  //signup with provider like clerk oauth
  static async signupWithProvider(req: Request, res: Response) {
    const { email, username, provider, providerId } = req.body;

    try {
      //check if auth account with provider already exists
      const exists = await SignupController.checkExistingAuthAccount(
        provider,
        providerId
      );
      if (exists) {
        throw new Error("Auth account with provider already exists");
      }

      //create new user

      const newUser = await User.create({
        email,
        username,
        role: "user",
        isActive: true,
      });

      await UserAuthAccount.create({
        userId: newUser._id,
        provider,
        email,
        providerUserId: providerId,
      });

      res
        .status(201)
        .json({ message: "User signed up with provider successfully" });
    } catch (error) {
      res.status(500).json({
        error: "Failed to sign up user with provider",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async checkExistingAuthAccount(
    provider: string,
    providerId: string
  ): Promise<boolean> {
    const existingAccount = await UserAuthAccount.findOne({
      provider,
      providerId,
    });
    return existingAccount !== null;
  }
}
