import { clerkClient, requireAuth, getAuth, verifyToken } from "@clerk/express";
import type { AuthUser } from "../../types/auth.js";
import config from "../../config/config.js";
import UserAuthAccount from "../../models/UserAuthAccount.js";

const { CLERK_SECRET_KEY } = config;

class ClerkService {
  private clerkClient: typeof clerkClient;

  constructor() {
    if (!CLERK_SECRET_KEY) {
      throw new Error("CLERK_SECRET_KEY is not set in environment variables");
    }

    this.clerkClient = clerkClient;
  }

  async verifyToken(token: string): Promise<AuthUser> {
    if (!CLERK_SECRET_KEY) {
      throw new Error("CLERK_SECRET_KEY is not set in environment variables");
    }

    const decodedToken = await verifyToken(token, {
      secretKey: CLERK_SECRET_KEY,
    });

    const userId = decodedToken.sub;

    const userRecord = await UserAuthAccount.findOne({
      providerUserId: userId,
      provider: "clerk",
    }).lean();

    if (!userRecord) {
      throw new Error("User not found");
    }

    return {
      userId: userRecord?.userId.toString(),
      email: userRecord.emailAddresses[0]?.emailAddress || "",
      emailVerified:
        userRecord.emailAddresses[0]?.verification?.status == "verified",
      provider: "clerk",
      username: userRecord.username || undefined,
      name: userRecord.firstName || undefined,
    };
  }

  // async getUser(uid: string): Promise<AuthUser | null> {
  //   const userRecord = await this.clerkClient.users.getUser(uid);

  //   if (!userRecord) {
  //     return null;
  //   }

  //   return {
  //     user_id: userRecord.id,
  //     email: userRecord.emailAddresses[0]?.emailAddress || "",
  //     email_verified:
  //       userRecord.emailAddresses[0]?.verification?.status == "verified",
  //     provider: "clerk",
  //     username: userRecord.username || undefined,
  //     name: userRecord.firstName || undefined,
  //   };
  // }
}

export const clerkService = new ClerkService();
