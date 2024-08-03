import { useEffect, useState } from "react";
import { RepairDataT } from "../../../../types";
import FilterMenu from "./FilterMenu";

type Filter = {
  category: string;
  option: string;
};

type FilterMenuContainerProps = {
  // categories: Map<string, Set<string>>;
  setFilteredList: React.Dispatch<React.SetStateAction<RepairDataT[]>>;
  // onFiltersChangeCallback?: (updateFilters: Filter[]) => void;
  repairList: RepairDataT[];
};

export default function FilterMenuContainer({
  // onFiltersChangeCallback,
  // categories,
  setFilteredList,
  repairList,
}: FilterMenuContainerProps) {
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]);
  const filtersAvailable = createFilters(repairList);

  //format displaying filters available
  const filterCategories = Array.from(filtersAvailable.filterOptionsMap.keys());
  const filterOptionsMap = filtersAvailable.filterOptionsMap;

  ///filter list displayed
  useEffect(() => {
    const newList = applyFilters(repairList, appliedFilters);
    console.log("newList", newList);
    setFilteredList(newList);
  }, [appliedFilters]);

  function handleFilterChange(updatedFilters: Filter[]) {
    setAppliedFilters(updatedFilters);
  }

  return (
    <div>
      <ul></ul>
      <FilterMenu
        onFilterChangeCallback={handleFilterChange}
        filterCategories={filterCategories}
        filterCategoryOptions={filterOptionsMap}
      />
    </div>
  );
}

function applyFilters(items: RepairDataT[], filters: Filter[]) {
  const filteredItems = items.filter((item) => {
    //if any filter does not match return false
    if (filters.length > 0) {
      for (let i = 0; i < filters.length; i++) {
        const currentFilter = filters[i];
        //todo what if property is an array like tags
        if (item[currentFilter.category] != currentFilter.option) {
          return false;
        }

        return true;
      }
    } else {
      return true;
    }
  });

  return filteredItems;
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

  // console.log("filterOptionsMap", Array.from(filterOptionsMap.entries()));

  return { filterCategories, filterOptionsMap };
}
