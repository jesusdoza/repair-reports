import {
  it,
  expect,
  describe,
  test,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
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

const mockMemberEntries = [
  { memberEntry: "fasdf" },
  { memberEntry: "fasdf" },
  { memberEntry: "fasdf" },
  { memberEntry: "fasdf" },
];
const mockInviteEntries = [
  { InviteEntry: "fasdf" },
  { InviteEntry: "fasdf" },
  { InviteEntry: "fasdf" },
];

//MOCK MODELS FOR MONGOOSE
mongoose.models.Member.find = vi.fn().mockResolvedValue(mockMemberEntries);
mongoose.models.Invite.find = vi.fn().mockResolvedValue(mockInviteEntries);

//
const app = express();
app.use(express.json());

app.post("/api/groups/add", addMemberTogroup);

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

const requestIntercept = vi.fn().mockImplementation((req) => {
  req.user = { _id: "123" };
  return req;
});

app.get("/api/groups", (req: Request, res: Response) => {
  // req.user = { _id: "125" };
  req = requestIntercept(req);
  getUsersGroups(req, res);
});

describe("groupController test", () => {
  const application = app as unknown as App;

  it("should return 200 when user object is present", async () => {
    //setup as if user is authenticated

    const response = await request(application).get("/api/groups");
    expect(response.statusCode).toBe(200);
  });

  it("should return array of objects", async () => {
    const response = await request(application).get("/api/groups");

    console.log("response", response.body);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(mockMemberEntries.length);
  });

  it("should return 401 when no user id is found", async () => {
    requestIntercept.mockImplementationOnce((req) => {
      return req;
    });

    const response = await request(application).get("/api/groups");

    expect(response.statusCode).toBe(401);
  });
});
