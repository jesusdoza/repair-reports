import type { Request, Response } from "express";
import UserAuthAccount from "../../models/UserAuthAccount.js";
import User from "../../models/User.js";

// Controller to handle user signup
const signupUser = async (req: Request, res: Response) => {
  const NEW_USER_TOKEN_GIFT = 5300; //tokens to give user for verifying email

  //middleware should have added user to req with basic provider info like email, provider, provider user id
  const user = req.user;

  if (!user || !user?.userId || !user?.provider || !user.email) {
    return res.status(401).json({
      message: "Unauthorized: User not found in userWelcomeFlow",
      error: "User not found",
    });
  }

  try {
    let appUserEntry = await AuthService.getAppUser({ email: user.email });

    //check if user account exists with this email
    if (appUserEntry) {
      return res.status(401).json({
        message: "user already exists",
        error: "user already exists",
      });
    }

    appUserEntry = await AuthService.createAppUser({
      email: user.email,
      username: user.username || "New User", //! should get from external auth service
    });

    let userAuthAccount = await AuthService.getUserAuthAccount({
      provider: user.provider,
      providerUserId: user.userId,
    });

    //user already exists with this provider do not allow signup
    if (userAuthAccount) {
      res.status(401).json({
        message: "User already exists",
        error: "User already exists",
      });
      return;
    }

    // If user not found, then create new user
    try {
      appUserEntry = await AuthService.createAppUser({
        email: user?.email,
        // primaryAuthProvider: user.provider,
        username: user?.username || "New User",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }

    //create auth account linking to app user
    userAuthAccount = await AuthService.createUserAuthAccount({
      provider: user.provider,
      providerUserId: user.userId,
      email: user.email,
      userId: appUserEntry._id.toString(), // Will link to app user
    });

    return res.status(201).json({
      message: `User Created Successfully`,
      success: true,
      error: undefined,
    });
  } catch (error) {
    console.error("Error updating email:", error);

    res.status(400).json({
      message: "Error signing up user",
      error: (error as Error).message,
      success: false,
    });
  }
};

export { signupUser };

type getUserAuthAccountParams = {
  provider: string;
  providerUserId: string;
};
class AuthService {
  static async getUserAuthAccount(params: getUserAuthAccountParams) {
    // Implementation here
    const userAuthAccount = await UserAuthAccount.findOne({
      provider: params.provider,
      providerUserId: params.providerUserId,
    });

    return userAuthAccount;
  }

  static async createUserAuthAccount(params: {
    provider: string;
    providerUserId: string;
    email: string;
    userId: string;
  }) {
    // Implementation here
    const userAuthAccount = await UserAuthAccount.create({
      provider: params.provider,
      providerUserId: params.providerUserId,
      email: params.email,
      userId: params.userId,
    });
    return userAuthAccount;
  }

  static async getAppUser(params: { email: string }) {
    // Implementation here

    const appUser = await User.findOne({ email: params.email });
    return appUser;
  }

  static async createAppUser(params: { email: string; username: string }) {
    // Implementation here
    const newUser = await User.create({
      email: params.email,
      username: params.username,
    });

    return newUser;
  }
}
