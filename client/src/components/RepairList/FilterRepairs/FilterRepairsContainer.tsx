import { RepairDataT } from "../../../../types";
import FilterOptions from "./FilterOptions";

type filterProps = {
  list: RepairDataT[];
  setList: (list: RepairDataT[]) => void;
};

export default function FilterRepairsContainer({
  list,
  setList = () => {},
}: filterProps) {
  console.log("list", list);
  console.log("setList", setList);

  //TODO filter funtionality
  createFilters(list);

  return <FilterOptions filterOptions={["one", "two"]} />;
}

function createFilters(list: RepairDataT[]) {
  const ignoreFields = new Set([
    "visibility",
    "removed",
    "__V",
    "_id",
    "procedureArr",
  ]);

  //different fields available in objects to filter by
  let categories = new Set();

  //available options under each filter
  // {category1:[value1, value2,],category2:[value3, value4,] }
  let filterOptionsMap = new Map<string, Set<string>>();

  list.forEach((item) => {
    const fields = Object.getOwnPropertyNames(item).filter(
      (str) => !ignoreFields.has(str)
    );

    //add values for each field to map to know how many different values there are
    fields.forEach((f) => {
      if (!filterOptionsMap.has(f)) {
        filterOptionsMap.set(f, new Set());
      }
      const tempSet = filterOptionsMap.get(f);

      if (tempSet) {
        tempSet.add(item[f]);
      }
    });

    categories = new Set([...Array.from(categories), ...fields]);
  });

  const filterCategories = Array.from(categories.values());

  console.log("filterCategories", filterCategories);

  return { filterCategories, filterOptions: filterOptionsMap };
}
