import React, { useEffect, useState } from "react";

import UsersRepairs from "./UsersRepairs";
import FilterMenuContainer from "../../components/RepairList/FilterRepairs/FilterMenuContainer";
import useGetUserRepairs from "../../hooks/useGetUserRepairs";
import { RepairDataT } from "../../../types";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export default function DashboardPageContainer(): React.ReactNode {
  const [page, setPage] = useState(0);

  const {
    data: usersRepairs,
    isLoading,
    isError,
  } = useGetUserRepairs({
    limit: 10,
    page,
  });

  const [filteredList, setFilteredList] = useState<RepairDataT[]>([]); //optionally filtered data

  useEffect(() => {
    if (usersRepairs) setFilteredList(usersRepairs?.results);
  }, [usersRepairs]);

  if (isError) {
    return <div>error loading repairs</div>;
  }

  if (isLoading) {
    return <div>loading repairs...</div>;
  }

  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <ErrorBoundary componentName="FilterMenuContainer">
          <FilterMenuContainer
            repairList={usersRepairs?.results || []}
            setFilteredList={setFilteredList}
            // categories={filterOptionsMap}
          />
        </ErrorBoundary>
      </aside>
      <main className="w-5/6 bg-slate-700">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <ErrorBoundary componentName="UsersRepairs">
          <UsersRepairs repairList={filteredList} />
        </ErrorBoundary>
        <section>
          <ErrorBoundary componentName="UsersRepairs">
            <PaganationControls
              onPageChange={(pageNumber: number) => {
                setPage(pageNumber);
              }}
            />
          </ErrorBoundary>
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

// function createFilters(list: RepairDataT[]) {
//   const ignoreFields = new Set([
//     "visibility",
//     "removed",
//     "__v",
//     "_id",
//     "procedureArr",
//     "searchTags",
//     "title",
//     "createdBy",
//   ]);

//   //different fields available in objects to filter by
//   let categories = new Set<string>();

//   //available options under each filter
//   // {category1:[value1, value2,],category2:[value3, value4,] }
//   const filterOptionsMap = new Map<string, Set<string>>();

//   list.forEach((item) => {
//     const fields = Object.getOwnPropertyNames(item).filter(
//       (str) => !ignoreFields.has(str)
//     );

//     //add values for each field to map to know how many different values there are
//     fields.forEach((f) => {
//       if (!filterOptionsMap.has(f)) {
//         filterOptionsMap.set(f, new Set());
//       }
//       const tempSet = filterOptionsMap.get(f);

//       if (tempSet) {
//         tempSet.add(item[f] as string);
//         filterOptionsMap.set(f, tempSet);
//       }
//     });

//     categories = new Set([...Array.from(categories), ...fields]);
//   });

//   const filterCategories: string[] = Array.from(categories.values());

//   // console.log("filterOptionsMap", Array.from(filterOptionsMap.entries()));

//   return { filterCategories, filterOptionsMap };
// }

// function applyFilters(items: RepairDataT[], filters: Filter[]) {
//   const filteredItems = items.filter((item) => {
//     //if any filter does not match return false
//     if (filters.length > 0) {
//       for (let i = 0; i < filters.length; i++) {
//         const currentFilter = filters[i];
//         //todo what if property is an array like tags
//         if (item[currentFilter.category] != currentFilter.option) {
//           return false;
//         }

//         return true;
//       }
//     } else {
//       return true;
//     }
//   });

//   return filteredItems;
// }
