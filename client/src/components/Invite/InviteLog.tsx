import { InviteT } from "../../../types";
import { InviteListing } from "./InviteListing/InviteListing";

const testInvites = [
  {
    inviteCode: "string",
    password: "string",
    groups: [
      { id: "1234", name: "cool group" },
      { id: "1234533", name: "another group" },
    ],

    createdAt: "string",
    status: "pending",
  },
];

type InviteLogProps = {
  invites?: InviteT[];
};

export default function InviteLog({ invites = testInvites }: InviteLogProps) {
  return (
    <div>
      <table className=" w-full">
        <section className=""></section>

        <tr>
          <th>Status</th>
          <th>Invite Code</th>
          <th>Invite Password</th>
          <th>Groups</th>
        </tr>
        {invites.map((inv) => {
          return <InviteListing invite={inv} />;
        })}
      </table>
    </div>
  );
}
