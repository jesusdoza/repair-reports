import { it, expect, describe, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import mockApiResponse from "./mockApiResponse.ts";
import RepairReportsApi from "../../../src/api/RepairReportsApi.ts";
import axios from "axios";

const API_URL = "/testapi";

vi.stubEnv("API_URL", API_URL);

const limitOnResults = 1;

const mockGetlatestArgs = [
  `${API_URL}/api/repairs`,
  { withCredentials: true, params: { num: limitOnResults } },
];

describe("Repair Reports Api integration", () => {
  const axiosMockGet = vi.spyOn(axios, "get");
  axiosMockGet.mockResolvedValue({ data: { repairs: mockApiResponse } });

  it("getLatestRepairs call api with correct query params  ", async () => {
    const { getLatestRepairs } = RepairReportsApi;

    expect(await getLatestRepairs()).toEqual(mockApiResponse);
  });
});
