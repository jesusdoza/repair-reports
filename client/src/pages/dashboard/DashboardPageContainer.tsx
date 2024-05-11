import React, { useState } from "react";

import UsersRepairs from "./UsersRepairs";
import { Repair } from "../../classes/Repair";
import { RepairCard } from "../../components/RepairList/RepairCard";
import FilterRepairsContainer from "../../components/RepairList/FilterRepairs/FilterRepairsContainer";

const testRepairList = [new Repair(), new Repair()];

export default function Dashboard(): React.ReactNode {
  const [repairList, setRepairList] = useState(testRepairList); //TODO get users repairs from server hook

  const repairCards = repairList.map((repairObj) => {
    const procedure =
      repairObj?.procedureArr.length > 0
        ? repairObj?.procedureArr[0]
        : undefined;
    const imageObj =
      procedure && procedure.imageObjs.length > 0
        ? procedure.imageObjs[0]
        : undefined;
    const url = imageObj?.imageThumb ? imageObj?.imageThumb : undefined;
    const title = repairObj?.title ? repairObj?.title : "no title";
    const summary = procedure?.instructions
      ? procedure?.instructions
      : undefined;
    return (
      <div className="relative h-full">
        <div className="card-actions justify-end absolute h-full flex z-[21] right-0 ">
          <ul className="z-1 flex flex-col gap-2">
            <li>
              <a
                className="btn w-full"
                href="/repair/edit/<%= repairs[index]._id %>">
                edit
              </a>
            </li>
            <li>
              <a
                className="btn w-full"
                href="/repair/<%= repairs[index]._id %>">
                view
              </a>
            </li>
            <li className="">
              <a
                className="btn w-full"
                href="/repair/<%= repairs[index]._id %>#delete-tool">
                delete
              </a>
            </li>
          </ul>
        </div>
        <RepairCard
          title={title}
          previewUrl={url}
          summary={summary}
        />
      </div>
    );
  });

  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <h3>Filter</h3>
        <FilterRepairsContainer
          setList={(list: Repair[]) => setRepairList(list)}
          list={repairList}
        />
      </aside>
      <main className="w-5/6 bg-green-600 ">
        <UsersRepairs repairList={repairCards} />;
      </main>
    </div>
  );
}
