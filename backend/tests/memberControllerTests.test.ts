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
// import mongoose from "mongoose";
import request from "supertest";
import express from "express";
import { App } from "supertest/types.js";

import Member from "../models/Member.js";
import Invite from "../models/Invite.js";

import "./testEnvSetup/mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason

//create in memory database
import { setupDatabase, teardownDatabase } from "./testEnvSetup/mockMongoDb.js";

//controller under test
import {
  getUsersGroups,
  addMemberTogroup,
} from "../controllers/api/membersController.js";

const mockMemberEntries = [new Member({ userId: "userId", groupId: "group1" })];
const mockInviteEntries = new Invite({
  inviteCode: "1111",
  password: "password",
  groups: [
    {
      roles: ["testing group1 role"],
      id: "group1",
      name: "group 1 name",
    },
    {
      roles: ["testing group 1 role"],
      id: "group2",
      name: "group 2 name",
    },
  ],
});

const requestIntercept = vi.fn().mockImplementation((req) => {
  req.user = { _id: "userId" };
  return req;
});

//MOCK MODELS FOR MONGOOSE
Member.find = vi.fn().mockResolvedValue(mockMemberEntries);
Invite.findOne = vi.fn().mockResolvedValue(mockInviteEntries);

//test app instance
const app = express();
app.use(express.json());

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

//TEST ROUTES
const getMemberships = "/members/user";
const postMembership = "/members/join";
app.post(postMembership, (req: Request, res: Response) => {
  req = requestIntercept(req);
  addMemberTogroup(req, res);
});
app.get(getMemberships, (req: Request, res: Response) => {
  // req.user = { _id: "125" };
  req = requestIntercept(req);
  getUsersGroups(req, res);
});

describe("groupController test", () => {
  const application = app as unknown as App;

  it("should return 200 when user object is present and list of entries getMemberships", async () => {
    const response = await request(application).get(getMemberships);
    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(mockMemberEntries.length);
  });

  it("should return 401 when user is not authenticated getMemberships", async () => {
    //remove user authentication to mock invalid user
    requestIntercept.mockImplementationOnce((req) => {
      return req;
    });

    const response = await request(application).get(getMemberships);

    expect(response.statusCode).toBe(401);
  });

  it("should return 401 when user is not authenticated members/join POST", async () => {
    //remove user authentication to mock invalid user
    requestIntercept.mockImplementationOnce((req) => {
      return req;
    });

    const response = await request(application).post(postMembership);

    expect(response.statusCode).toBe(401);
  });

  it("should return 201 when user sends valid invite code and password to have group membership created POST", async () => {
    //remove user authentication to mock invalid user
    const response = await request(application)
      .post(postMembership)
      .send({ inviteCode: "1111", password: "password" });

    expect(response.statusCode).toBe(201);
  });
  it("should return 401 when user sends missing invite code or invalid password to have group membership created POST", async () => {
    //remove user authentication to mock invalid user
    let response = await request(application)
      .post(postMembership)
      .send({ inviteCode: "1111", password: "wrong password" });

    expect(response.statusCode).toBe(401);

    response = await request(application)
      .post(postMembership)
      .send({ inviteCode: undefined, password: "password" });

    expect(response.statusCode).toBe(401);
  });
});
