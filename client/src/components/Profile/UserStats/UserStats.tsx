import { Link } from "react-router-dom";

type UserStatsPropsT = {
  totalRepairs?: number;
  groupsList?: GroupListingT[];
};

export type GroupListingT = {
  groupName: string;
  roles: string[];
  groupId: string;
};

export default function UserStats({
  totalRepairs = 0,
  groupsList = [],
}: UserStatsPropsT) {
  const joinedGroupsRows = createRows(groupsList);

  return (
    <div className="flex flex-col gap-1">
      <div className="self-center w-full flex justify-center">
        <div className="avatar placeholder w-full">
          <div className="bg-neutral text-neutral-content w-full rounded-full">
            <span className="text-[100px]">D</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-1">
        {/* <section className="flex gap-1"> */}
        <section>
          <Link
            to={"/dashboard"}
            className="btn ">
            <div>
              <span className="block">Total Repairs</span>
              <div className="badge">{totalRepairs}</div>
            </div>
          </Link>
        </section>

        <section className="flex justify-center items-center">
          <details className="dropdown ">
            <summary className="btn flex flex-col">
              <span className="block">Joined Groups</span>
              <span className="badge">{groupsList.length}</span>
            </summary>
            <ul className=" dropdown-content bg-base-100 rounded-box w-52 p-2 shadow right-0">
              <li>
                <div className="h-max overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Group</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>{joinedGroupsRows}</tbody>
                  </table>
                </div>
              </li>
            </ul>
          </details>
        </section>
        {/* </section> */}
      </div>
    </div>
  );
}

function createRows(groupList: GroupListingT[]) {
  if (!groupList.length) return [];

  return groupList.map((listing) => {
    return (
      <tr data-testid="group-listing">
        <td>{listing.groupName}</td>
        <td>{listing.roles}</td>
      </tr>
    );
  });
}
