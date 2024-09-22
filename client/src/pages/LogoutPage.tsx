import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const { logout } = useAuthContext();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      await signOut();
      if (logout) await logout();

      navigate("/");
    };

    handleLogout();
  }, []);

  return <div>LogoutPage</div>;
}
