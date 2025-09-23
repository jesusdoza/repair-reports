import { clerkClient } from "@clerk/express";
import type { AuthUser } from "../../types/auth.js";

class ClerkService {
  private clerkClient: typeof clerkClient;

  constructor() {
    this.clerkClient = clerkClient;
  }

  async getUser(uid: string): Promise<AuthUser | null> {
    const userRecord = await this.clerkClient.users.getUser(uid);

    if (!userRecord) {
      return null;
    }

    return {
      user_id: userRecord.id,
      email: userRecord.emailAddresses[0]?.emailAddress || "",
      email_verified:
        userRecord.emailAddresses[0]?.verification?.status == "verified",
      provider: "clerk",
      username: userRecord.username || undefined,
      name: userRecord.firstName || undefined,
    };
  }
}

export const clerkService = new ClerkService();
