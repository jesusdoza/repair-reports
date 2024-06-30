type filter = {
  category: string;
  options: [string];
};

type FilterRepairsProps = {
  filterCategories: string[];
  filterCategoryOptions: Map<string, Set<string>>;
  setFilters?: (filter: filter) => void;
};

// {category:"", options:[""]}

export default function FilterOptions({
  filterCategories,
  filterCategoryOptions,
  setFilters,
}: FilterRepairsProps) {
  //create categories and options available
  const filters = filterCategories.map((category) => {
    const availableOptions = filterCategoryOptions.get(category);

    const filterOptions = availableOptions
      ? createFilterOptionComponents(Array.from(availableOptions))
      : [];

    return (
      <li className="p-1">
        <h2 className="menu-title">{category}</h2>
        <ul>{filterOptions}</ul>
      </li>
    );
  });
  return (
    <div>
      <ul className="menu bg-slate-500 rounded-box w-full">{filters}</ul>
    </div>
  );
}

function createFilterOptionComponents(
  options?: string[],
  onClickCallback?: () => void
) {
  return options?.map((option) => {
    return (
      <li
        className="btn btn-sm bg-slate-600"
        onClick={onClickCallback}>
        {option}
      </li>
    );
  });
}
