import { it, expect, describe, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { act } from "@testing-library/react";
import axios from "axios";

//mock expected api response
import mockApiResponse from "./mockApiResponse.ts";

//HACK to get the env variables mocked before the imported module
import "./mockEnv.ts";

//module under test
import RepairReportsApi from "../../../src/api/RepairReportsApi.ts";

const limitOnResults = 2;

const expectedGetlatestArgs = [
  `${import.meta.env.VITE_API_URL}/api/repairs`,
  { withCredentials: true, params: { num: limitOnResults } },
];

const expectedDefaultGetlatestArgs = [
  `${import.meta.env.VITE_API_URL}/api/repairs`,
  { withCredentials: true, params: { num: 1 } },
];

describe("Repair Reports Api integration", () => {
  const axiosMockGet = vi.spyOn(axios, "get");
  const { getLatestRepairs } = RepairReportsApi;

  axiosMockGet.mockResolvedValue({ data: { repairs: mockApiResponse } });

  it("getLatestRepairs call api with correct query params  ", async () => {
    act(async () => {
      await getLatestRepairs(limitOnResults);
    });

    expect(axiosMockGet).toBeCalledWith(...expectedGetlatestArgs);
  });

  it("should default params when not included", () => {
    act(async () => {
      await getLatestRepairs();
    });

    expect(axiosMockGet).toBeCalledWith(...expectedDefaultGetlatestArgs);
  });
});
