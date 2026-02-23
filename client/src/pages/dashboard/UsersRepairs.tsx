import { v4 as uuidv4 } from "uuid";
import { RepairCard } from "../../components/RepairList/RepairCard";
import { RepairEditControls } from "./RepairEditControls";
import { RepairDataT } from "../../../types";
type UsersRepairsProps = {
  repairList: RepairDataT[];
};

export type ControlOption = {
  name: string;
  action: () => void;
};

const controls: ControlOption[] = [
  {
    name: "view",
    action: () => {
      console.log("view button");
    },
  },
  {
    name: "edit",
    action: () => {
      console.log("edit button");
    },
  },
  {
    name: "delete",
    action: () => {
      console.log("delete button");
    },
  },
];

export default function UsersRepairs({ repairList = [] }: UsersRepairsProps) {
  return (
    <div className="w-full px-6 py-8 bg-background rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-primary mb-6 tracking-tight">
        Your Repairs
      </h3>
      <section>
        <RepairsList
          controls={controls}
          repairList={repairList}
        />
      </section>
    </div>
  );
}

function RepairsList({
  controls,
  repairList,
}: {
  controls: ControlOption[];
  repairList: RepairDataT[];
}) {
  //create react components
  const list = repairList.map((repairObj) => {
    const title = repairObj?.title || "untitled repair";
    const url =
      repairObj?.procedures && repairObj?.procedures.length > 0
        ? repairObj?.procedures[0]?.images[0].url
        : "#";

    return (
      <li
        className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 flex"
        key={uuidv4()}>
        <div className="relative h-full w-full bg-card rounded-xl shadow-lg border border-border flex flex-col transition-transform hover:scale-[1.025] hover:shadow-xl">
          <div className="card-actions justify-end absolute top-3 right-3 z-10">
            <RepairEditControls controls={controls} />
          </div>
          <RepairCard
            title={title}
            previewUrl={url}
            summary={"summary"}
          />
        </div>
      </li>
    );
  });

  return <ul className="flex flex-wrap w-full items-stretch gap-6">{list}</ul>;
}
