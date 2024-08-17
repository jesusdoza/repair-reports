type UserStatsPropsT = {
  totalRepairs?: number;
  groupsList?: GroupListingT[];
};

export type GroupListingT = {
  groupName: string;
  role: string[];
  groupId: string;
};

export default function UserStats({
  totalRepairs = 0,
  groupsList = [],
}: UserStatsPropsT) {
  const joinedGroupsRows = createRows(groupsList);

  return (
    <div className="flex flex-col">
      <div className="self-center">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-[300px] rounded-full">
            <span className="text-[100px]">D</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* <section className="flex gap-1"> */}
        <section>
          <div className="btn ">
            <div>
              <span className="block">Total Repairs</span>
              <div className="badge">{totalRepairs}</div>
            </div>
          </div>
        </section>

        <section className="flex justify-center items-center">
          <details className="dropdown ">
            <summary className="btn flex flex-col">
              <span className="block">Joined Groups</span>
              <span className="badge">{groupsList.length}</span>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow ">
              <li>
                <div className="h-96 overflow-x-auto">
                  <table className="table table-pin-rows">
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
        <td>{listing.role}</td>
      </tr>
    );
  });
}
