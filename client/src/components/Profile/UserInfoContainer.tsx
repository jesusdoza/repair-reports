import useAuthContext from "../../hooks/useAuthContext";
import UserInforUpdateForm from "./ProfileUpdate/UserInfoUpdateForm";

export default function UserInfoContainer() {
  const { userInfo } = useAuthContext();

  const allowEdit = userInfo?.authProvider === "local" ? true : false;

  return (
    <UserInforUpdateForm
      edit={allowEdit}
      email={userInfo?.email}
      username={userInfo?.username}
    />
  );
}
