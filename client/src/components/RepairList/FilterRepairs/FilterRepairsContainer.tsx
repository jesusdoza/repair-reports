import { Repair } from "../../../classes/Repair";
import FilterRepairs from "./FilterRepairs";

type filterProps = {
  list: Repair[];
  setList: (list: Repair[]) => void;
};

export default function FilterRepairsContainer({
  list,
  setList = () => {},
}: filterProps) {
  console.log("list", list);
  setList(list);
  return <FilterRepairs filterOptions={["one", "two"]} />;
}
