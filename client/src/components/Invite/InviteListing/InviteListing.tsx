export interface InviteT {
  inviteCode: string;
  invitePassword: string;
  groups: { id: string; name: string }[];
  createdAt: string;
  status: string;
}

export function InviteListing({ invite }: { invite?: InviteT }) {
  return (
    <tr>
      <td className="text-center">{invite?.status || ""}</td>
      <td className="text-center">{invite?.inviteCode || ""}</td>
      <td className="text-center">{invite?.invitePassword || ""}</td>
      <td className="text-center">
        <ul className="w-full">
          {invite?.groups
            ? invite?.groups.map((g) => (
                <li
                  key={g.id}
                  className="w-full">
                  <span className="text-wrap">
                    <span>{g.id.slice(0, 6)}:</span>
                    {g.name}
                  </span>
                </li>
              ))
            : ""}
        </ul>
      </td>
    </tr>
  );
}
