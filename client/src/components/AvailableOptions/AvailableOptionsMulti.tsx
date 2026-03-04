// import React from "react";

import CreatableSelect from "react-select/creatable";

// import { v4 as uuidv4 } from "uuid";

export type OptionT = {
  value: string;
  label: string;
};

export default function AvailableOptionsMulti({
  options,
  callback,
  id,
}: // defaultValue,
{
  options: OptionT[];
  id: string;
  callback?: (options: string[]) => void;
  // defaultValue?: OptionT[];
}) {
  // const inputTitle = title ? title : "multi select";

  // const id = uuidv4().slice(0, 5);

  return (
    <div
      data-testid="available-options-multi"
      className="flex flex-col justify-around items-center">
      <div className="flex-1 flex justify-center w-full">
        <CreatableSelect
          isMulti
          inputId={`${id}`}
          className="w-full"
          // defaultValue={defaultValue ? defaultValue : options[0]}
          isClearable
          onChange={(options) => {
            // if (callback) callback(options);
            const tags = options.map((tagObj) => {
              return tagObj.value;
            });
            if (callback) callback(tags);

            return;
          }}
          options={options}
        />
      </div>
    </div>
  );
}
