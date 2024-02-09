import useGetLatest from "../hooks/useGetLatest";
import RepairList from "../components/RepairList/RepairList";

export default function LatestRepairsPage() {
  //todo get latest repairs

  const repairs = useGetLatest(8);

  return (
    <div className="center-block w-full p-3">
      <RepairList repairList={repairs} />
    </div>
  );
}
