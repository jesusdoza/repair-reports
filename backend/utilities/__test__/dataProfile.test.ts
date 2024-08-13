import { it, expect, describe, test } from "vitest";
import dataProfile, { findMissing } from "../dataProfile.ts";
import Repair from "../models/Repair.js";

// import dataJson from "../../ignoreFiles/repairs_8_6_24.json";

let testDataPath = "./ignoreFiles/test.json";
testDataPath = "./ignoreFiles/repairs_8_6_24.json";

describe("dataProfile", () => {
  it("accept path string to json and return object ", async () => {
    const result = await dataProfile(testDataPath);

    expect(typeof result).toBe("object");
  });

  it("should error gracefully if path to json is invalid", async () => {
    const { error } = await dataProfile("./no file");

    expect(error).toContain("file does not exist");
  });
  it("should return amount of objects parsed", async () => {
    const { objsParsed } = await dataProfile(testDataPath);

    expect(objsParsed).toBeGreaterThan(0);
  });

  it("should return array of different object patterns found", async () => {
    const { objsParsed, patterns } = await dataProfile(testDataPath);
    expect(patterns[0]).toHaveProperty("pattern");
  });
});

describe("findMissing() utility", () => {
  const missingItem = "missing from list";
  const desiredPattern = ["bob", "test"];
  desiredPattern.push(missingItem);

  const patternNotMatching = ["bob", "test", "extra"];

  it("should get the properties that are mssing from array", () => {
    const missingFormList = findMissing(desiredPattern, patternNotMatching);
    expect(missingFormList).toEqual([missingItem]);
  });
});
