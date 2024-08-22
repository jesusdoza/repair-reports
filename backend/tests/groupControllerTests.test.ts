import { it, expect, describe, test, vi, beforeAll, afterAll } from "vitest";
import "./testEnvSetup/mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason
import mongoose from "mongoose";
import request from "supertest";
import express from "express";
import { App } from "supertest/types.js";

import "./testEnvSetup/mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason

//create in memory database
import { setupDatabase, teardownDatabase } from "./testEnvSetup/mockMongoDb.js";

//controller under test
import {
  getUsersGroups,
  addMemberTogroup,
} from "../controllers/api/groupsController.js";

vi.mock("../models/Invite.js", () => ({
  find: vi.fn().mockResolvedValue([{}, {}, {}]),
}));

vi.mock("'../models/Member.js'", () => ({
  find: vi.fn().mockResolvedValue([{}, {}]),
}));

const app = express();
app.use(express.json());
app.get("/api/groups", getUsersGroups);
app.post("/api/groups/add", addMemberTogroup);

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

describe("group", () => {
  const application = app as unknown as App;

  it("should return 401 on missing user or id missing", async () => {
    const response = await request(application)
      .get("/api/groups")
      .set("user", JSON.stringify({}));

    expect(response.statusCode).toBe(401);
  });
});
