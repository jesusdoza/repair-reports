import React from "react";

type FilterRepairsProps = { filterOptions: string[] };

export default function FilterRepairs({
  filterOptions = ["filter1", "filter 2"],
}) {
  const filters = filterOptions.map((option) => {
    return (
      <li className="p-1">
        <div className="btn">filter By{option}</div>
      </li>
    );
  });
  return (
    <div>
      <ul className="flex flex-col">{filters}</ul>
    </div>
  );
}
