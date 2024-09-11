import { useState } from "react";

import JoinWithInviteForm from "../../components/Invite/JoinWithInvite/JoinWithInviteForm";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function InvitePage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  const handleJoinGroup = async (inviteCode: string, password?: string) => {
    try {
      await joinGroup({ inviteCode, password });
      navigate("/profile");
    } catch (error) {
      console.log("error getting invite by code", error);
      setErrors(["invalid code"]);
    }
  };

  return (
    <div>
      <JoinWithInviteForm
        onSubmit={handleJoinGroup}
        errors={errors}
      />
    </div>
  );
}

async function joinGroup({
  inviteCode,
  password,
}: {
  inviteCode: string;
  password?: string;
}) {
  await axios.post(
    `${API_URL}/members/join`,
    { inviteCode, password },
    {
      withCredentials: true,
    }
  );
}
