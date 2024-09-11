import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";

//mock expected api response
import mockApiResponse from "./mockApiResponse.ts";

//HACK to get the env variables mocked before the imported module
import "./mockEnv.ts";

//module under test
import useRepairApi from "../../../src/hooks/useRepairApi.ts";

const limitOnResults = 2;

const expectedGetlatestArgs = [
  `${import.meta.env.VITE_API_URL}/repairs`,
  { withCredentials: true, params: { num: limitOnResults } },
];

const expectedDefaultGetlatestArgs = [
  `${import.meta.env.VITE_API_URL}/repairs`,
  { withCredentials: true, params: { num: 1 } },
];

describe("Repair Reports Api integration", () => {
  const axiosMockGet = vi.spyOn(axios, "get");

  beforeEach(() => {
    axiosMockGet.mockResolvedValue({ data: { repairs: mockApiResponse } });
  });
  afterEach(() => {
    axiosMockGet.mockReset();
  });

  it("getLatestRepairs call api with correct query params  ", async () => {
    const { result } = renderHook(() => useRepairApi());

    let response;
    await act(async () => {
      response = await result.current.getLatestRepairs(limitOnResults);
    });

    expect(axiosMockGet).toBeCalledWith(...expectedGetlatestArgs);
    expect(response).toEqual(mockApiResponse);
  });

  it("getLatestRepairs call api with default query params if none included  ", async () => {
    const { result } = renderHook(() => useRepairApi());

    await act(async () => {
      await result.current.getLatestRepairs();
    });

    expect(axiosMockGet).toBeCalledWith(...expectedDefaultGetlatestArgs);
  });

  it("should return array ", async () => {
    const { result } = renderHook(() => useRepairApi());
    let response;

    await act(async () => {
      response = await result.current.getLatestRepairs(limitOnResults);
    });

    await waitFor(
      () => {
        expect(Array.isArray(response)).toBe(true);
      },
      { timeout: 500 }
    );
  });
});
