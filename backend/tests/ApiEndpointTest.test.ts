import { it, expect, describe, test } from "vitest";
import request from "supertest";
import { App } from "supertest/types.js";
import "./mockEnv.js"; //mock env variables loaded need to load before app wont work in same file for some reason

import app from "../app.js";

describe("api endpoints tests", () => {
  const application = app as unknown as App;

  it("should allow logout from api no authentication", async () => {
    const openRoutes = ["/api/logout"];
    const length = openRoutes.length;

    for (let i = 0; i < length; i++) {
      const route = openRoutes[i];
      let response = await request(application).get(route);

      expect(response.status, `failed on route ${route}`).toBe(200);
    }
  });

  it("should allow test account login on api", async () => {
    const route = "/api/login";

    let response = await request(application).post(route);

    expect(response.status, `failed on route ${route}`).toBe(200);
  });
});
