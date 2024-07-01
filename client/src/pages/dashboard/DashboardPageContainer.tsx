import React, { useEffect, useState } from "react";

import UsersRepairs from "./UsersRepairs";
import FilterMenuContainer from "../../components/RepairList/FilterRepairs/FilterMenuContainer";
import useGetUserRepairs from "../../hooks/useGetUserRepairs";
import { RepairDataT } from "../../../types";
// const testRepairList = [new Repair(), new Repair()];

type Filter = {
  category: string;
  option: string;
};

export default function DashboardPageContainer(): React.ReactNode {
  const { repairsData: foundRepairs, getData: getUserRepairs } =
    useGetUserRepairs();

  const PAGE_LIMIT = 10;

  const [repairList, setRepairList] = useState<RepairDataT[]>(foundRepairs); //data

  const [filteredList, setFilteredList] = useState<RepairDataT[]>(repairList); //optionally filtered data
  const [appliedFilters, setAppliedFilters] = useState<
    Map<string, Set<string>>
  >(new Map()); //optionally filtered data

  useEffect(() => {
    getUserRepairs(PAGE_LIMIT, 0);
  }, []);

  useEffect(() => {
    console.log("fetch data");

    setRepairList(foundRepairs);
    setFilteredList(foundRepairs);
  }, [foundRepairs]);

  useEffect(() => {
    console.log("filters set", appliedFilters);
  }, [appliedFilters]);

  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <FilterMenuContainer
          setFilters={(filter: Filter) => {
            //todo get filters working

            setAppliedFilters((currentFilters) => {
              return updateFilter({
                filters: currentFilters,
                newFilter: filter,
              });
            });
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

function updateFilter({
  filters,
  newFilter,
}: {
  filters: Map<string, Set<string>>;
  newFilter: Filter;
}) {
  //create map with set
  // key is category
  //value will be set of strings
  //check for value before adding
  //remove if already in set
  //else add into set

  console.log("newFilter", newFilter);

  const category = filters.get(newFilter.category);
  if (category) {
    //has filter category check if value is present
    const values = category.entries();
  }

  console.log("updated filters", filters);

  return filters;
}
