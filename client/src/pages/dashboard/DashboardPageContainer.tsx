import React, { useEffect, useState } from "react";

import UsersRepairs from "./UsersRepairs";
import FilterRepairsTool from "../../components/RepairList/FilterRepairs/FilterRepairsContainer";
import useGetUserRepairs from "../../hooks/useGetUserRepairs";
import { RepairDataT } from "../../../types";
// const testRepairList = [new Repair(), new Repair()];

type Filter = {
  category: string;
  options: [string];
};

export default function DashboardPageContainer(): React.ReactNode {
  const { repairsData: foundRepairs, getData: getUserRepairs } =
    useGetUserRepairs();

  const PAGE_LIMIT = 10;

  const [repairList, setRepairList] = useState<RepairDataT[]>(foundRepairs); //data

  const [filteredList, setFilteredList] = useState<RepairDataT[]>(repairList); //optionally filtered data
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]); //optionally filtered data

  useEffect(() => {
    getUserRepairs(PAGE_LIMIT, 0);
  }, []);

  useEffect(() => {
    setRepairList(foundRepairs);
    setFilteredList(foundRepairs);
  }, [foundRepairs]);

  useEffect(() => {
    console.log("filters set", appliedFilters);
  }, [appliedFilters]);

  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <FilterRepairsTool
          setFilters={(filter: Filter) => {
            console.log("set applied filters", filter);

            //todo get filters working
            setAppliedFilters([filter]);
          }}
          list={filteredList}
        />
      </aside>
      <main className="w-5/6 bg-green-600 ">
        <UsersRepairs repairList={filteredList} />
        <section>
          <PaganationControls
            onPageChange={(pageNumber: number) => {
              getUserRepairs(PAGE_LIMIT, pageNumber);
            }}
          />
        </section>
      </main>
    </div>
  );
}

type paginationProps = {
  onPageChange: (pageNumber: number) => void;
};

function PaganationControls({ onPageChange = () => {} }: paginationProps) {
  const [page, setPage] = useState(0);
  return (
    <>
      {/* <h3>current page {page + 1}</h3> */}
      <section className="flex justify-between ">
        {page <= 0 ? (
          <div className="btn btn-disabled">page</div>
        ) : (
          <div
            onClick={() => {
              setPage((p) => {
                onPageChange(p - 1);
                return p - 1;
              });
            }}
            className="btn">
            page {page}
          </div>
        )}
        <div className="badge h-14">{page + 1}</div>
        <div
          onClick={() => {
            setPage((p) => {
              onPageChange(p + 1);
              return p + 1;
            });
          }}
          className="btn">
          page {page + 2}
        </div>
      </section>
    </>
  );
}
