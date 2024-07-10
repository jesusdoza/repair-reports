import { useState } from "react";

type GroupOptionT = {
  id: string;
  name: string;
};

//TODO remove test and use hook
const TestAvailableGroups = [
  { id: "1234", name: "cool group" },
  { id: "1234533", name: "another group" },
];

export default function InviteTool() {
  const [groupOptions, setGroupOptions] =
    useState<GroupOptionT[]>(TestAvailableGroups);

  return (
    <section className="relative p-2 border rounded-lg border-blue-600">
      <div className="flex justify-between">
        <div>
          <CreateInviteForm groupOptions={groupOptions} />
        </div>
        <div className="btn btn-sm ">
          <span>create invite +</span>
        </div>
      </div>
    </section>
  );
}

type CreateInviteFormPropsT = {
  groupOptions?: GroupOptionT[];
};

function CreateInviteForm({ groupOptions = [] }: CreateInviteFormPropsT) {
  const options = createOptions(groupOptions);
  return (
    <form className="flex flex-wrap">
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Invite Password</span>
            <span className="label-text-alt">Optional</span>
          </div>
          <input
            type="text"
            placeholder="Optional password"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>

      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick group</span>
          </div>
          <select className="select select-bordered">
            <option
              disabled
              selected>
              Pick Group
            </option>
            {options}
          </select>
        </label>
      </div>
    </form>
  );
}

//utility functions

function createOptions(options: GroupOptionT[]) {
  return options.map((optionData) => {
    return <option value={optionData.id}>{optionData.name}</option>;
  });
}
