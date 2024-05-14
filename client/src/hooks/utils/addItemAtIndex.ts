function addItemAtIndex<T>(index: number, item: T, arr: T[]) {
  let newArr = [...arr];

  if (index == 0) {
    return [item, ...newArr];
  }

  //index over limits place at end
  if (index >= arr.length - 1) {
    return [...newArr, item];
  }

  const start = newArr.slice(0, index);
  const end = newArr.slice(index);

  newArr = start.concat([item]).concat(end);

  return newArr;
}

export { addItemAtIndex };
