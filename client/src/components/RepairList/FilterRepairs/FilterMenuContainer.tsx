import FilterMenu from "./FilterMenu";

type Filter = {
  category: string;
  option: string;
};

type FilterProps = {
  categories: Map<string, Set<string>>;

  onFiltersChangeCallback?: (updateFilters: Filter[]) => void;
};

export default function FilterMenuContainer({
  onFiltersChangeCallback,
  categories,
}: FilterProps) {
  const filterCategories = Array.from(categories.keys());
  const filterOptionsMap = categories;

  function handleFilterChange(updatedFilters: Filter[]) {
    if (onFiltersChangeCallback) {
      onFiltersChangeCallback(updatedFilters);
    }
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
