const Clerk = require("@clerk/clerk-sdk-node");

const clerkClient = Clerk.createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
  jwtKey: process.env.CLERK_JWT_KEY,
});

// clerkClient.users.getUserList().then((data) => console.log(data));
const expressRequireAuth = clerkClient.expressRequireAuth();

// console.log("expressRequireAuth", expressRequireAuth());

module.exports = { clerkClient, expressRequireAuth };
