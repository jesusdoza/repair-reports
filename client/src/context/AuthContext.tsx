import React, { createContext, useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import axios from "axios";
type User = { username: string };

export const AuthContext = createContext({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userToken, setUserToken] = useState<string | null>("null");
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    console.log("userInfo", userInfo);
    console.log("userToken display for testing remove this console.log", [
      userToken,
    ]);
  }, [userToken, userInfo]);

  // const logout = async () => {
  //   console.log("google auth signout");
  //   await signOut(auth);
  //   setUserToken(null);
  // };
  const login = async (email: string, password: string) => {
    console.log("logging request sent");
    axios.post(import.meta.env.VITE_API_URL, {
      email: "email here",
      password: "this is password",
    });
    // setUserToken(null);
  };

  // const auth = getAuth();

  // if (!userToken) return <h1>NOT LOGGED IN</h1>;

  const values = { userToken, setUserToken, userInfo };

  return (
    <AuthContext.Provider value={values}>
      {!userToken ? <LoginModal /> : <>{children}</>}
    </AuthContext.Provider>
  );
};
