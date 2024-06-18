import React, { useEffect, useState } from "react";

import UsersRepairs from "./UsersRepairs";
import FilterRepairsContainer from "../../components/RepairList/FilterRepairs/FilterRepairsContainer";
import useGetUserRepairs from "../../hooks/useGetUserRepairs";
import { RepairDataT } from "../../../types";
// const testRepairList = [new Repair(), new Repair()];

export default function DashboardPageContainer(): React.ReactNode {
  const foundRepairs = useGetUserRepairs();

  const [repairList, setRepairList] = useState<RepairDataT[]>(foundRepairs);
  const [filteredList, setFilteredList] = useState<RepairDataT[]>(repairList);

  useEffect(() => {
    if (foundRepairs.length > 0) {
      console.log("foundRepairs", foundRepairs);
      setRepairList(foundRepairs);
      setFilteredList(foundRepairs);
    }
  }, [foundRepairs]);

  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <h3>Filter</h3>
        <FilterRepairsContainer
          setList={(list: RepairDataT[]) => setFilteredList(list)}
          list={repairList}
        />
      </aside>
      <main className="w-5/6 bg-green-600 ">
        <UsersRepairs repairList={filteredList} />
      </main>
    </div>
  );
}
