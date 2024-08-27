import { Procedure } from "../../src/classes/Procedure";
import { addItem } from "../../src/hooks/utils/addItem";

import { it, expect, describe } from "vitest";

const testArray = [new Procedure(), new Procedure(), new Procedure()];

describe("group", () => {
  it("should place at beggining", () => {
    const newItem = new Procedure();
    const targetIndex = 0;
    const result = addItem({
      arr: testArray,
      id: testArray[targetIndex]._id,
      item: newItem,
      pos: "begining",
    });

    expect(result[0]._id).toBe(newItem._id);
  });

  it("should place at end", () => {
    const newItem = new Procedure();
    newItem._id = "new";
    const targetIndex = 0;

    const result = addItem({
      arr: testArray,
      id: testArray[targetIndex]._id,
      item: newItem,
      pos: "end",
    });

    expect(result[result.length - 1]._id).toBe(newItem._id);
  });

  it("should place after specified index", () => {
    let targetIndex = testArray.length - 1;
    const newItem = new Procedure();
    newItem._id += "new Item";

    let result = addItem({
      arr: testArray,
      id: testArray[targetIndex]._id,
      item: newItem,
      pos: "after",
    });

    expect(result[targetIndex + 1]._id).toBe(newItem._id);

    //second version
    targetIndex = 2;
    const startingSize = testArray.length;

    result = addItem({
      arr: testArray,
      id: testArray[targetIndex]._id,
      item: newItem,
      pos: "after",
    });

    console.log(
      "result",
      result.map((p) => p._id)
    );

    expect(result[targetIndex + 1]._id).toBe(newItem._id);
    expect(result.length).toBeGreaterThan(startingSize);
  });

  it("should place before specified index", () => {
    let targetIndex = testArray.length - 1;
    let newItem = new Procedure();
    newItem._id += "new Item";

    let result = addItem({
      arr: testArray,
      id: testArray[targetIndex]._id,
      item: newItem,
      pos: "before",
    });

    expect(result[targetIndex]._id).toBe(newItem._id);

    //second version
    targetIndex = 1;
    newItem = new Procedure();
    newItem._id += "new Item";
    const startingSize = testArray.length;

    result = addItem({
      arr: testArray,
      id: testArray[targetIndex]._id,
      item: newItem,
      pos: "before",
    });

    expect(result[targetIndex]._id).toBe(newItem._id);
    expect(result.length).toBeGreaterThan(startingSize);
  });
});
