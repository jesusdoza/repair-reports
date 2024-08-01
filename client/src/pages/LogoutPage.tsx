import useAuthContext from "../hooks/useAuthContext";

export default function LogoutPage() {
  const { logout } = useAuthContext();

  logout && logout();
  return <div>LogoutPage</div>;
}
