interface GroupData {
  roles: string[];
}

export default function isInviteAllowed(data: GroupData) {
  if (data.roles.includes("invite")) return true;

  return false;
}
