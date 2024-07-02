import { useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";

type Filter = {
  category: string;
  option: string;
};

type StringSetMap = {
  [key: string]: Set<string>;
};

type FilterProps = {
  categories: Map<string, Set<string>>;

  setFilters?: (filter: Filter) => void;
};

export default function FilterMenuContainer({
  setFilters,
  categories,
}: FilterProps) {
  //TODO filter funtionality

  const [activeFilters, setActiveFilters] = useState<StringSetMap>({});

  const filterCategories = Array.from(categories.keys());
  const filterOptionsMap = categories;

  useEffect(() => {
    console.log("activeFilters", activeFilters);
  }, [activeFilters]);

  function handleFilterChange(newFilter: Filter) {
    //if category filter exists
    const categorySet = activeFilters[newFilter.category];

    if (categorySet) {
      //filter already active remove it
      if (categorySet.has(newFilter.option)) {
        categorySet.delete(newFilter.option);

        //no filters in this category anymore
        if (categorySet.size == 0) {
          delete activeFilters[newFilter.category];
        }
      } else {
        categorySet.add(newFilter.option);
      }

      setActiveFilters({ ...activeFilters });
      return;
    }

    //if category doesnt exist
    activeFilters[newFilter.category] = new Set<string>().add(newFilter.option);

    setActiveFilters({ ...activeFilters });
  }

  const activeFilterComponents = Object.entries(activeFilters);
  console.log("activeFilterComponents", activeFilterComponents);

  return (
    <div>
      <ul></ul>
      <FilterMenu
        setFilters={handleFilterChange}
        filterCategories={filterCategories}
        filterCategoryOptions={filterOptionsMap}
      />
    </div>
  );
}
