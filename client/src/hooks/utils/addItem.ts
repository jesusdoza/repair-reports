type ItemWithIdT = { _id: string };
interface addItemInterface<T extends ItemWithIdT> {
  id?: string;
  pos: "before" | "after" | "begining" | "end";
  arr: T[];
  item: T;
}

//id of target to base insertion on
//pos position to insert item depending on id
//arr array which item will be inserted into
//item object to insert into array
function addItem<T extends ItemWithIdT>({
  id,
  pos,
  arr,
  item,
}: addItemInterface<T>) {
  const newArr = [...arr];

  if (pos == "begining") {
    return [item, ...newArr];
  }

  if (pos == "end") {
    return [...newArr, item];
  }

  //find item and pos before or after

  const targetIndex = newArr.findIndex((element) => element?._id == id);

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

  return front.concat(end);
}

export { addItem };
