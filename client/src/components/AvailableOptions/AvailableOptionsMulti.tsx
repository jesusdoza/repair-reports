// import React from "react";

import CreatableSelect from "react-select/creatable";

export type OptionT = {
  value: string;
  label: string;
};

export default function AvailableOptionsMulti({
  options,
  title,
  callback,
}: {
  options: OptionT[];
  title: string;
  callback?: (options: string[]) => void;
}) {
  return (
    <div className="flex flex-col w-full justify-around items-center align-middle ">
      <div className="flex-1 flex justify-end">
        <span className="">{title}</span>
      </div>
      <div className="flex-1 flex justify-start">
        <CreatableSelect
          isMulti
          className=""
          defaultValue={options[0]}
          isClearable
          onChange={(options) => {
            // if (callback) callback(options);
            console.log("options from multi select", options);
          }}
          options={options}
        />
      </div>
    </div>
  );
}
