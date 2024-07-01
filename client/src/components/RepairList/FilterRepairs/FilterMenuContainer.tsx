import { RepairDataT } from "../../../../types";
import FilterMenu from "./FilterMenu";

type Filter = {
  category: string;
  option: string;
};

type FilterProps = {
  list: RepairDataT[];
  setFilters?: (filter: Filter) => void;
};

export default function FilterMenuContainer({ list, setFilters }: FilterProps) {
  // console.log("list", list);
  // console.log("setList", setList);

  //TODO filter funtionality
  const { filterCategories, filterOptionsMap } = createFilters(list);

  return (
    <FilterMenu
      setFilters={setFilters}
      filterCategories={filterCategories}
      filterCategoryOptions={filterOptionsMap}
    />
  );
}

function createFilters(list: RepairDataT[]) {
  const ignoreFields = new Set([
    "visibility",
    "removed",
    "__v",
    "_id",
    "procedureArr",
    "searchTags",
    "title",
    "createdBy",
  ]);

  //different fields available in objects to filter by
  let categories = new Set<string>();

  //available options under each filter
  // {category1:[value1, value2,],category2:[value3, value4,] }
  const filterOptionsMap = new Map<string, Set<string>>();

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
        tempSet.add(item[f] as string);
        filterOptionsMap.set(f, tempSet);
      }
    });

    categories = new Set([...Array.from(categories), ...fields]);
  });

  const filterCategories: string[] = Array.from(categories.values());

  return { filterCategories, filterOptionsMap };
}
