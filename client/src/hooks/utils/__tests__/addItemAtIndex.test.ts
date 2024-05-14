import { addItemAtIndex } from "../addItemAtIndex";

const testArr = [1, 1, 1, 1, 1];

describe("addItemAtIndex", () => {
  test("returns array", () => {
    const result = addItemAtIndex(0, 3, testArr);
    expect(Array.isArray(result)).toBe(true);
  });

  test("add item to array", () => {
    const result = addItemAtIndex(0, 3, testArr);
    expect(result.length).toBeGreaterThan(testArr.length);
  });

  test("add item to array at begining", () => {
    const item = 3;
    const atIndex = 0;
    const result = addItemAtIndex(atIndex, item, testArr);
    expect(result[0]).toBe(item);
  });

  test("add item to array at end of array", () => {
    const item = 3;
    const atIndex = testArr.length - 1;
    const result = addItemAtIndex(atIndex, item, testArr);
    expect(result.pop()).toBe(item);
  });

  test("add item to array at end of array if out of limits", () => {
    const item = 3;
    const atIndex = testArr.length + 10;
    const result = addItemAtIndex(atIndex, item, testArr);
    expect(result.pop()).toBe(item);
  });

  test("array should have original values", () => {
    const item = 3;
    const atIndex = testArr.length + 10;
    const result = addItemAtIndex(atIndex, item, testArr);
    expect(result).toEqual([...testArr, item]);
  });

  test("should insert into correct index", () => {
    const item = 3;
    expect(addItemAtIndex(3, item, testArr)[3]).toBe(item);
    expect(addItemAtIndex(2, item, testArr)[2]).toBe(item);
  });
  test("should insert object into correct index", () => {
    const item = { test: 10 };
    const testArr = [
      { test: 1 },
      { test: 2 },
      { test: 3 },
      { test: 4 },
      { test: 5 },
    ];

    let result = addItemAtIndex(3, item, testArr);
    expect(result[3]).toEqual(item);
    console.log("original", testArr);
    console.log("result", result);
    expect(result.length).toBeGreaterThan(testArr.length);

    result = addItemAtIndex(0, item, testArr);
    expect(result[0]).toEqual(item);
    console.log("original", testArr);
    console.log("result", result);
    expect(result.length).toBeGreaterThan(testArr.length);

    result = addItemAtIndex(1, item, testArr);
    expect(result[1]).toEqual(item);
    console.log("original", testArr);
    console.log("result", result);
    expect(result.length).toBeGreaterThan(testArr.length);
  });
});
