import { it, expect, describe, test } from "vitest";
import dataProfile from "../dataProfile.ts";

// import dataJson from "../../ignoreFiles/repairs_8_6_24.json";

const testDataPath = "./ignoreFiles/test.json";

describe("dataProfile", () => {
  it("accept path string to json and return object ", async () => {
    const result = await dataProfile(testDataPath);

    expect(typeof result).toBe("object");
  });

  it("should error gracefully if path to json is invalid", async () => {
    const { error } = await dataProfile("./no file");

    expect(error).toBe("file does not exist");
  });
  it("should return amount of objects parsed", async () => {
    const { objsParsed } = await dataProfile(testDataPath);

    expect(objsParsed).toBeGreaterThan(0);
  });
  // it.todo(
  //   "should return array of different object patterns found",
  //   async () => {}
  // );
  // it.todo("should return ", async () => {});
});
