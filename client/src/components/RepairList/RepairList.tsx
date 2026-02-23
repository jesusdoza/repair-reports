import { Link } from "react-router-dom";
import { RepairCard } from "./RepairCard";
import { v4 as uuidv4, v4 } from "uuid";
import noImagePlaceholder from "../../assets/no-image.png";
import { RepairDataT } from "../../../types";

interface latestRepairsProps {
  repairList: RepairDataT[];
}

export default function RepairList({
  repairList,
}: latestRepairsProps): React.ReactNode {
  if (!repairList || repairList?.length === 0) {
    return (
      <li
        key={v4()}
        className="w-full text-center py-8">
        <h3 className="text-lg text-muted-foreground font-medium">
          No repairs to display
        </h3>
      </li>
    );
  }

  const repairs = repairList.map((data) => {
    return (
      <li
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3 flex"
        key={uuidv4()}>
        <Link
          state={{ repair: data }}
          to={`/repair/${data._id}`}
          className="w-full h-full block group">
          <RepairCard
            title={data.title}
            summary={
              data.procedureArr &&
              data.procedureArr?.length &&
              data.procedureArr[0]?.instructions
                ? data.procedureArr[0]?.instructions
                : "test summary"
            }
            previewUrl={
              data.procedureArr &&
              data.procedureArr?.length &&
              data.procedureArr[0]?.images[0]
                ? data.procedureArr[0].images[0]
                : noImagePlaceholder
            }
          />
        </Link>
      </li>
    );
  });
  return (
    <ul className="flex flex-wrap gap-6 justify-center items-stretch w-full">
      {repairs}
    </ul>
  );
}
