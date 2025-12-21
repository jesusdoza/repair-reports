import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      await signOut();

      navigate("/");
    };

    handleLogout();
  }, []);

  return <div>LogoutPage</div>;
}
