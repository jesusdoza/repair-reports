import { useState } from "react";

import JoinWithInviteForm from "../../components/Invite/JoinWithInvite/JoinWithInviteForm";
import useInviteManager from "../../hooks/useInviteManager";

import { useNavigate } from "react-router-dom";

export default function InvitePage() {
  const { getInvite } = useInviteManager();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  const handleGetInvite = async (inviteCode: string, password?: string) => {
    try {
      await getInvite({ inviteCode, password });
      navigate("/profile");
    } catch (error) {
      console.log("error getting invite by code", error);
      setErrors(["invalid code"]);
    }
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
