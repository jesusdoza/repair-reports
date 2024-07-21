import { it, expect, describe, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import useGetUserGroups from "../../src/hooks/useGetUserGroups";
import axios, { Axios } from "axios";

const mockReturn = [
  {
    _id: "324234",
    groupId: "afdasf",
    groupName: "group name",
    role: ["read"],
    userId: "12dfaewf",
    username: "bob username",
  },
];

const axiosGet = vi.spyOn(axios, "get");
describe("useGetUserGroups", () => {
  //     vi.mock("axios", async () => {
  //       const axios = await vi.importActual("axios");

  //       return {
  //         ...axios,
  //         get: vi.fn().mockResolvedValue({ data: ["fasdf"] }),
  //       };
  //     });
  //   });
  //
  it("should return array", async () => {
    //
    axiosGet.mockImplementation(() => {
      return Promise.resolve({ data: [{ faf: "afsad" }] });
    });

    const { result } = renderHook(() => useGetUserGroups());

    await act(async () => {
      await result.current.fetchData();
    });
    await waitFor(() => {
      expect(Array.isArray(result.current.data)).toBe(true);
      expect(axiosGet).toBeCalledTimes(2);
    });
    await vi.waitFor(
      () => {
        console.log("result.current", result.current);
      },
      { timeout: 1000 }
    );
  });
});

// import { it, expect, describe, vi } from "vitest";
// import { act, renderHook } from "@testing-library/react";
// import "@testing-library/jest-dom/vitest";

// import axios from "axios";

// import useGetUserGroups from "../../src/hooks/useGetUserGroups";

// const mockReturn = [
//   {
//     _id: "324234",
//     groupId: "afdasf",
//     groupName: "group name",
//     role: ["read"],
//     userId: "12dfaewf",
//     username: "bob username",
//   },
// ];

// const axiosGet = vi.spyOn(axios, "get");

// describe("useGetUserGroups", () => {
//   //
//   it("should return array", async () => {
//     //
//     axiosGet.mockResolvedValue({ data: mockReturn });

//     const { result } = renderHook(() => useGetUserGroups());

//     await act(async () => {
//       result.current.fetchData();

//       await vi.waitFor(
//         () => {
//           console.log("result.current", result.current);
//           expect(Array.isArray(result.current.data)).toBe(true);
//         },
//         { timeout: 2000 }
//       );
//     });
//   });
// });
