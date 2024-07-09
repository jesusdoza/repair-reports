type InviteT = {
  inviteCode: string;
  invitePassword: string;
  groupsId: string[];
  createdAt: string;
};

type InviteToolPropsT = {
  invites?: InviteT[];
};

const testInvites = [
  {
    inviteCode: "string",
    invitePassword: "string",
    groupsId: ["1234", "1234533"],
    createdAt: "string",
  },
];

export default function InviteTool({
  invites = testInvites,
}: InviteToolPropsT) {
  return (
    <table>
      <tr>
        <th>Invite Code</th>
        <th>Invite Password</th>
        <th>Groups</th>
      </tr>
      {invites.map((inv) => {
        return <InviteListing invite={inv} />;
      })}
    </table>
  );
}

function InviteListing({ invite }: { invite: InviteT }) {
  return (
    <tr>
      <td>{invite.inviteCode}</td>
      <td>{invite.invitePassword}</td>
      <td>
        <ul>
          {invite.groupsId.map((id) => (
            <li>{id}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}
