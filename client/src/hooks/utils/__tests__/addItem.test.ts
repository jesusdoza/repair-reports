import { addItem } from "../addItem";

const testArr = [{ id: "1" }, { id: "2" }, { id: "3" }];
const newItem = { id: "newItem" };

describe("addItem", () => {
  test("returns array", () => {
    const result = addItem({
      item: newItem,
      arr: testArr,
      pos: "begining",
    });
    expect(Array.isArray(result)).toBe(true);
  });

  test("add item to array", () => {
    const result = addItem({
      item: newItem,
      arr: testArr,
      pos: "begining",
    });
    expect(result.length).toBeGreaterThan(testArr.length);
  });

  test("add item to array at begining", () => {
    const result = addItem({
      item: newItem,
      arr: testArr,
      pos: "begining",
    });
    expect(result[0]).toBe(newItem);
  });

  test("add item to array at end of array", () => {
    const result = addItem({
      id: "not existent id",
      item: newItem,
      arr: testArr,
      pos: "end",
    });
    expect(result.pop()).toEqual(newItem);
  });

  test("add item to array at end of array if id does not exist", () => {
    const result = addItem({
      id: "does not exist",
      item: newItem,
      arr: testArr,
      pos: "before",
    });
    expect(result.pop()).toBe(newItem);
  });

  test("array should have original values", () => {
    const result = addItem({
      id: "does not exist",
      item: newItem,
      arr: testArr,
      pos: "end",
    });
    expect(result).toEqual([...testArr, newItem]);
  });

  test("should insert into correct location", () => {
    const targetId = "1";
    let result = addItem({
      id: "1",
      item: newItem,
      arr: testArr,
      pos: "after",
    });
    console.log("after id 1", result);
    expect(result[1]).toEqual(newItem);

    result = addItem({
      id: "2",
      item: newItem,
      arr: testArr,
      pos: "before",
    });

    console.log("before id 2", result);
    expect(result[1]).toEqual(newItem);
  });
});
