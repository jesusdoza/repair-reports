import React, { SetStateAction } from "react";
import { repairDataT } from "../../hooks/useGetLatest";

type selectionT = {
  value: string;
  label: string;
};

export default function AvailableOptions({
  options,
  name,
  title,
  callback,
}: {
  options: selectionT[];
  name: string;
  title: string;
  callback?: (engineSelected: string) => void;
}) {
  const selections = options.map((item: selectionT) => {
    return createOption(item);
  });
  return (
    <div className="flex gap-3">
      <span>{title}</span>
      <select
        onChange={(event) => {
          console.log("event select", event.target.value);

          if (callback) callback(event.target.value || options[0].value);
        }}
        name={name}
        className="select select-info w-full max-w-xs">
        {selections}
      </select>
    </div>
  );
}

function createOption({ value, label }: selectionT) {
  return (
    <option
      id={value + "id"}
      value={value}>
      {label}
    </option>
  );
}
