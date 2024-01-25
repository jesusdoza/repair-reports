import useGetLatest from "../hooks/useGetLatest";
import RepairList from "../components/RepairList/RepairList";

export default function LatestRepairsPage() {
  //todo get latest repairs

  const repairs = useGetLatest();

  return (
    <div className="center-block">
      <RepairList repairList={repairs} />
    </div>
  );
}
