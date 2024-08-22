import { it, expect, describe, test, vi, beforeAll, afterAll } from "vitest";
import "./testEnvSetup/mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason
import mongoose from "mongoose";
import * as Member from "../models/Member.js";
import * as Invite from "../models/Invite.js";
import request from "supertest";
import { App } from "supertest/types.js";

import "./testEnvSetup/mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason

import app from "../app.js";
import {
  setupDatabase,
  teardownDatabase,
  uriEnv,
} from "./testEnvSetup/mockMongoDb.js";

const testGroupMembershipEntries = [
  //   MemberModal.create({
  //     groupId: "1111",
  //     groupName: "group1",
  //     userId: "userid1",
  //     username: "bob",
  //   }),
  //   new Member({
  //     groupId: "1222",
  //     groupName: "group2",
  //     userId: "userid1",
  //     username: "bob",
  //   }),
  //   new Member({
  //     groupId: "333",
  //     groupName: "group3",
  //     userId: "userid3",
  //     username: "not bob",
  //   }),
];

beforeAll(async () => {
  await setupDatabase();

  //   await Member.bulkSave(testGroupMembershipEntries);
});

afterAll(async () => {
  await teardownDatabase();
});

describe("group", () => {
  const application = app as unknown as App;

  it("should return users groups", () => {});
});
