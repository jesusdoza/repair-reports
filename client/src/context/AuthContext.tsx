import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import LoginCard from "../components/LoginSignUp/LoginCard";

const API_URL = import.meta.env.VITE_API_URL;

type User = {
  username: string;
  _id: string;
  role: string;
  email: string;
  groups: string[];
};
export type authContextT = {
  userToken: string | null;
  setUserToken: object | null;
  userInfo: User | null;
  login: ((email: string, password: string) => Promise<void>) | null;
  signUp:
    | ((email: string, password: string, username: string) => Promise<void>)
    | null;
};
export const AuthContext = createContext<authContextT>({
  userToken: null,
  setUserToken: null,
  userInfo: null,
  login: null,
  signUp: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
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
    console.log("email", email);
    console.log("password", password);
    const response = await axios.post(`${API_URL}api/login`, {
      email,
      password,
    });
    console.log("response", response.data);
    if (response.data.login === "success") {
      setUserInfo((state) => {
        return { ...state, ...response.data.message };
      });
      setIsAuth(true);
      return;
    }

    setIsAuth(false);
  };

  const signUp = async (email: string, password: string, username: string) => {
    const response = await axios.post(`${API_URL}api/signup`, {
      email,
      password,
      username,
    });
    console.log("response", response.data);
  };

  const values: authContextT = {
    userToken,
    setUserToken,
    userInfo,
    login,
    signUp,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuth ? <LoginCard /> : <>{children}</>}
    </AuthContext.Provider>
  );
};
