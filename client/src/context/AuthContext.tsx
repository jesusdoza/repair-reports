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
  logout: (() => Promise<void>) | null;
  signUp:
    | (({
        email,
        password,
        username,
        inviteCode,
      }: {
        email: string;
        password: string;
        username: string;
        inviteCode: string;
      }) => Promise<void>)
    | null;
  unauthorizedError: () => void;
  verifyLogin: () => void;
};

export const AuthContext = createContext<authContextT>({
  userToken: null,
  setUserToken: null,
  userInfo: null,
  login: null,
  signUp: null,
  logout: null,
  unauthorizedError: () => {},
  verifyLogin: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    console.log("verigy login");
    verifyLogin();
  }, []);

  const logout = async () => {
    // console.log("logout");
    const response = await axios.get(`${API_URL}/api/logout`, {
      withCredentials: true,
    });
    setUserToken(null);
    setIsAuth(false);
    console.log("response", response);
  };

  const login = async (email: string, password: string) => {
    console.log(" `${API_URL}/api/login`", `${API_URL}/api/login`);
    const response = await axios.post(
      `${API_URL}/api/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    // console.log("response", response.data.user);
    if (response.data.login === "success") {
      setUserInfo((state) => {
        return { ...state, ...response.data.user };
      });
      setIsAuth(true);
      return;
    }

    setIsAuth(false);
  };

  const signUp = async ({
    email,
    username,
    password,
    inviteCode,
  }: {
    email: string;
    password: string;
    username: string;
    inviteCode: string;
  }) => {
    const response = await axios.post(`${API_URL}/api/signup`, {
      email,
      password,
      username,
      inviteCode,
    });
    console.log("response", response.data);
  };

  const unauthorizedError = () => {
    console.log("unauthorized log in again");
    setIsAuth(false);
  };

  async function verifyLogin() {
    const response = await axios.get(`${API_URL}/api/login/verify`, {
      withCredentials: true,
    });
    // console.log("response", response.data.user);
    if (response.status == 200) {
      const user = response.data.user;
      console.log("userverify login: ", response.data.user);
      if (user) {
        setUserInfo((state) => {
          return { ...state, ...response.data.user };
        });
        setIsAuth(true);
      }
      return;
    }

    setIsAuth(false);
  }

  const values: authContextT = {
    userToken,
    setUserToken,
    userInfo,
    login,
    logout,
    signUp,
    unauthorizedError,
    verifyLogin,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuth ? <LoginCard /> : <>{children}</>}
    </AuthContext.Provider>
  );
};
