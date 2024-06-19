import React, { useState } from "react";

import UsersRepairs from "./UsersRepairs";
import { Repair } from "../../classes/Repair";
import FilterRepairsContainer from "../../components/RepairList/FilterRepairs/FilterRepairsContainer";
import { RepairDataT } from "../../../types";

const testRepairList = [new Repair(), new Repair()];

export default function DashboardPageContainer(): React.ReactNode {
  const [repairList, setRepairList] = useState(testRepairList); //TODO get users repairs from server hook

  // const repairCards = createCards(repairList);

  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <h3>Filter</h3>
        <FilterRepairsContainer
          setList={(list: RepairDataT[]) => setRepairList(list)}
          list={repairList}
        />
      </aside>
      <main className="w-5/6 bg-green-600 ">
        <UsersRepairs repairList={repairList} />
      </main>
    </div>
  );
}
