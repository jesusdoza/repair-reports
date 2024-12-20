import { Link } from "react-router-dom";
import { RepairCard } from "./RepairCard";
import { v4 as uuidv4 } from "uuid";
import noImagePlaceholder from "../../assets/no-image.png";
import { RepairDataT } from "../../../types";

interface latestRepairsProps {
  repairList: RepairDataT[];
}

export default function RepairList({
  repairList,
}: latestRepairsProps): React.ReactNode {
  if (!repairList) {
    return (
      <li>
        <h3>No repairs to display</h3>
      </li>
    );
  }
  const repairs = repairList.map((data) => {
    return (
      <li
        className="w-full p-1 sm:w-1/3 md:w-1/4"
        key={uuidv4()}>
        <Link
          state={{ repair: data }}
          to={`/repair/${data._id}`}
          className="w-full">
          <RepairCard
            title={data.title}
            summary={
              data.procedureArr.length > 0 && data.procedureArr[0]?.instructions
                ? data.procedureArr[0]?.instructions
                : ""
            }
            previewUrl={
              data.procedureArr.length > 0 && data?.procedureArr[0]?.images[0]
                ? data.procedureArr[0].images[0]
                : noImagePlaceholder
            }
          />
        </Link>
      </li>
    );
  });
  return <ul className="flex flex-wrap gap-0 justify-center ">{repairs}</ul>;
}
