import FilterRepairs from "./FilterRepairs";

type filterProps = {
  list: [];
  setList: (list: []) => void;
};

export default function FilterRepairsContainer({
  list,
  setList = () => {},
}: filterProps) {
  console.log("list", list);
  setList(list);
  return <FilterRepairs filterOptions={["one", "two"]} />;
}
