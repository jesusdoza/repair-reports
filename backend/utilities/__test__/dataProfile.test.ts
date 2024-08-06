import { it, expect, describe, test } from "vitest";
import dataProfile from "../dataProfile.ts";

// import dataJson from "../../ignoreFiles/repairs_8_6_24.json";

// const testData = dataJson;

describe("dataProfile", () => {
  // it("accept path string to json and return object with ", async () => {
  //   const result = await dataProfile("../../ignoreFiles/repairs_8_6_24.json");

  //   expect(typeof result).toBe("object");
  // });

  it("should error gracefully if path to json is invalid", async () => {
    const result = await dataProfile("./no file");

    console.log("result.error", result.error);
    expect(result.error).toBeTruthy();
  });
  it.todo("should return amount of objects parsed", () => {});
  it.todo("should return array of different object patterns found", () => {});
  it.todo("should return ", () => {});
});
