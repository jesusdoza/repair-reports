// middleware to load clerk user info
import { clerkMiddleware } from "@clerk/express";
import type { Request, Response } from "express";

export default function middleware() {
  return clerkMiddleware();
}
