// import { useState } from "react";

import { useEffect, useState } from "react";

type Filter = {
  category: string;
  option: string;
};

type FilterRepairsProps = {
  filterCategories: string[];
  filterCategoryOptions: Map<string, Set<string>>;
  setFilters?: (filter: Filter) => void;
};

export default function FilterMenu({
  filterCategories,
  filterCategoryOptions,
  setFilters,
}: FilterRepairsProps) {
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  function handleFilterChange(filter: Filter) {
    if (setFilters) {
      setFilters(filter);
    }

    setActiveFilters((state) => {
      const existingFilter = state.find(
        (item) =>
          item.category == filter.category && item.option == filter.option
      );

      if (existingFilter) {
        //remove filter
        return state.filter((item) => item != existingFilter);
      }

      return [...state, filter];
    });
  }

  //create categories and options available
  const filters = filterCategories.map((category) => {
    const availableOptions = filterCategoryOptions.get(category);

    const filterOptionComponents = availableOptions
      ? createFilterOptionComponents({
          category,
          options: Array.from(availableOptions),
          onClickCallback: handleFilterChange,
        })
      : [];

    return (
      <li className="p-1">
        <h2 className="">{category}</h2>
        <ul className="flex flex-wrap gap-1">{filterOptionComponents}</ul>
      </li>
    );
  });

  const activeFilterComponents = activeFilters.map((filter) => {
    return (
      <div
        className="btn"
        onClick={() => {
          handleFilterChange(filter);
        }}>
        <span>{filter.category}</span>
        <span>{filter.option}</span>
      </div>
    );
  });

  return (
    <div>
      <div>
        <span>active filters</span>
        <ul>{activeFilterComponents}</ul>
      </div>
      <ul className="bg-slate-500 rounded-box">{filters}</ul>
    </div>
  );
}

function createFilterOptionComponents({
  options,
  onClickCallback,
  category,
}: {
  options?: string[];
  onClickCallback?: (filter: Filter) => void;
  category: string;
}) {
  return options?.map((option) => {
    return (
      <li
        className="btn btn-sm bg-slate-600"
        onClick={() => {
          if (onClickCallback) {
            onClickCallback({ category, option });
          }
        }}>
        {option}
      </li>
    );
  });
}
