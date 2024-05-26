type addItemInterface = {
  id?: string;
  pos: "before" | "after" | "begining" | "end";
  arr: { id: string }[];
  item: { id: string };
};

function addItem({ id, pos, arr, item }: addItemInterface) {
  const newArr = [...arr];

  if (pos == "begining") {
    return [item, ...newArr];
  }

  if (pos == "end") {
    return [...newArr, item];
  }

  //find item and pos before or after
  let temp = [];
  const targetIndex = newArr.findIndex((element) => element?.id == id);

  if (targetIndex == -1) {
    newArr.push(item);

    return newArr;
  }

  const targetElement = newArr[targetIndex];
  const front = newArr.slice(0, targetIndex);
  const end = newArr.slice(targetIndex + 1);

  if (pos == "before") {
    front.push(item);
    front.push(targetElement);
  } else if (pos == "after") {
    front.push(targetElement);
    front.push(item);
  } else {
    front.push(item);
  }

  temp = front.concat(end);

  return temp;
}

export { addItem };
