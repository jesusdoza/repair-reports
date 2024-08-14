import { it, expect, describe, test } from "vitest";
import request from "supertest";
import { App } from "supertest/types.js";
import "./mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason

import app from "../app.js";

describe("server open and protected routes routes ", () => {
  const application = app as unknown as App;

  it("should load up home page '/' login and signup page with no authentication", async () => {
    await request(application).get("/").expect(200);
    await request(application).get("/login").expect(200);
    await request(application).get("/signup").expect(200);
  });
  it("should return 400 for protected routes when not authenticated", async () => {
    const protectedRoutes = ["/repair", "/dashboard", "/profile", "/comments"];
    const length = protectedRoutes.length;

    for (let i = 0; i < length; i++) {
      let response = await request(application).get(protectedRoutes[i]);

      expect(response.status, `faild on route ${protectedRoutes[i]}`).toBe(302);
      expect(response.headers["location"]).toBe("/login");
    }
  });
});
