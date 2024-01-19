import React, { createContext, useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type User = { username: string };
export type authContextT = {
  userToken: string | null;
  setUserToken: object | null;
  userInfo: User | null;
  login: (email: string, password: string) => Promise<void> | (() => void);
};
export const AuthContext = createContext<authContextT>({
  userToken: null,
  setUserToken: null,
  userInfo: null,
  login: (email: string, password: string) => Promise.resolve(),
});

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
    console.log(API_URL);
    axios.post(`${API_URL}login/api`, {
      email,
      password,
    });
    // setUserToken(null);
  };

  // const auth = getAuth();

  // if (!userToken) return <h1>NOT LOGGED IN</h1>;

  const values: authContextT = { userToken, setUserToken, userInfo, login };

  return (
    <AuthContext.Provider value={values}>
      {!userToken ? <LoginModal /> : <>{children}</>}
    </AuthContext.Provider>
  );
};
