import { useState } from "react";
import JoinWithInviteForm from "../../components/Invite/JoinWithInvite/JoinWithInviteForm";
import useInviteManager from "../../hooks/useInviteManager";
import { useNavigate } from "react-router-dom";

export default function SignupVerifyCodePage() {
  const [errors, setErrors] = useState<string[]>([]);
  const { getInvite } = useInviteManager();
  const navigate = useNavigate();

  const handleVerifyInvite = async (
    inviteCode: string,
    password: string | undefined
  ) => {
    setErrors([]);

    try {
      const response = await getInvite({ inviteCode, password });
      console.log("response", response);
      if (response.status === 200) {
        navigate(`/signup/clerk/${inviteCode}`);
      }
    } catch (error) {
      setErrors((e) => {
        return [...e, "invite code or password invalid"];
      });
    }
  };

  return (
    <div>
      <JoinWithInviteForm
        onSubmit={(invite, password) => handleVerifyInvite(invite, password)}
        errors={errors}
      />
    </div>
  );
}
