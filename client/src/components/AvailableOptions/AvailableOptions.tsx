import React from "react";

type selectionT = {
  value: string;
  label: string;
};

export default function AvailableOptions({
  options,
  name,
  title,
}: {
  options: selectionT[];
  name: string;
  title: string;
}) {
  const selections = options.map((item: selectionT) => {
    return createOption(item);
  });
  return (
    <div className="flex gap-3">
      <span>{title}</span>
      <select
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
