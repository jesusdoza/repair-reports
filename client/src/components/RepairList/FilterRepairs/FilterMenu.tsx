import { useState } from "react";

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
  function handleFilterChange(filter: Filter) {
    if (setFilters) {
      setFilters(filter);
    }
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

  return (
    <div>
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
