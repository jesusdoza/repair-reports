import React from "react";

import JoinWithInviteForm from "../../components/Invite/JoinWithInvite/JoinWithInviteForm";
import useInviteManager from "../../hooks/useInviteManager";

export default function InvitePage() {
  const { getInvite, errors } = useInviteManager();

  const handleGetInvite = (inviteCode: string, password?: string) => {
    getInvite({ inviteCode, password });
  };

  return (
    <div>
      <JoinWithInviteForm
        onSubmit={handleGetInvite}
        errors={errors}
      />
    </div>
  );
}
