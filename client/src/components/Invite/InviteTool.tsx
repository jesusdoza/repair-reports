// import useInviteManager from "../../hooks/useInviteManager";

import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";

export type GroupOptionT = {
  id: string;
  name: string;
};

type InviteToolProps = {
  availableGroups?: GroupOptionT[];
  onPostInvite?: (groupIds: string[], password?: string) => Promise<void>;
};

export default function InviteTool({
  availableGroups,
  onPostInvite,
}: InviteToolProps) {
  return (
    <section className="relative p-2 border rounded-lg border-blue-600">
      <div className="">
        <div>
          <InviteForm
            onSubmit={(groupIds: string[], password: string) => {
              onPostInvite && onPostInvite(groupIds, password);
            }}
            groupOptions={availableGroups}
          />
        </div>
      </div>
    </section>
  );
}

type CreateInviteFormPropsT = {
  groupOptions?: GroupOptionT[];
  onSubmit: (groupIds: string[], password: string) => void;
};

function InviteForm({ groupOptions = [], onSubmit }: CreateInviteFormPropsT) {
  //create options for creatable select to use
  const options = groupOptions.map((option) => {
    return { label: option.name, value: option.id };
  });

  //group ids selected
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        className="flex flex-wrap relative"
        onSubmit={(event) => {
          event.preventDefault();
          if (onSubmit) {
            onSubmit(groupIds, password);
          }
        }}>
        <div>
          <label className="form-control w-full h-[70px]">
            <div className="label">
              <span className="label-text">Invite Password</span>
              {/* <span className="label-text-alt">Optional</span> */}
            </div>
            <input
              type="text"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Optional password"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div>
          {!options.length && (
            <div className="btn btn-disabled">You dont have invite access</div>
          )}
          {Boolean(options.length) && (
            <label className="form-control w-full max-w-xs h-full">
              <div className="label">
                <span className="label-text">Pick group</span>
              </div>
              <CreatableSelect
                placeholder={"Select group"}
                isMulti
                className="w-44 h-full"
                // defaultValue={defaultValue ? defaultValue : options[0]}
                isClearable
                onChange={(options) => {
                  // if (callback) callback(options);
                  const groupIds = options.map((tagObj) => {
                    return tagObj.value;
                  });
                  // console.log("groupIds", groupIds);
                  setGroupIds(groupIds);

                  return;
                }}
                options={options}
              />
            </label>
          )}
        </div>
        <div className=" absolute right-0">
          <button
            className="btn btn-sm"
            typeof="submit"
            data-testid="invite-submit">
            create invite +
          </button>

          <div className="btn btn-sm">
            <Link to={"/invite"}>
              <div className="">Join group</div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
