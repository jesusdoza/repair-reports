import { repairDataT } from "../../hooks/useGetLatest";
import { RepairCard } from "./RepairCard";
interface latestRepairsProps {
  repairList: repairDataT[];
}

export default function RepairList({ repairList }: latestRepairsProps) {
  const repairs = repairList.map((data) => {
    return (
      <RepairCard
        key={Math.random() * 514}
        data={data}
      />
    );
  });
  return <div>{repairs}</div>;
}
