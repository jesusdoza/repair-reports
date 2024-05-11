import createThumbUrl from "../createThumbUrl";

test("should return string", () => {
  const url = createThumbUrl();

  expect(typeof url).toBe("string");
  return;
});
