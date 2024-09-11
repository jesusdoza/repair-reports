const Clerk = require("@clerk/clerk-sdk-node");

const clerkClient = Clerk.createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

module.exports = { clerkClient };
