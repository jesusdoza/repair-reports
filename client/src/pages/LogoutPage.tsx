import useAuthContext from "../hooks/useAuthContext";
import { useAuth } from "@clerk/clerk-react";

export default function LogoutPage() {
  const { logout } = useAuthContext();
  const { signOut } = useAuth();

  signOut();
  logout && logout();

  return <div>LogoutPage</div>;
}
