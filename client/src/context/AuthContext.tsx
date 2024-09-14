import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type User = {
  username: string;
  _id: string;
  clerkId: string;
  role: string;
  email: string;
  groups: string[];
  createdAt: string;
};

// 52c114
// }
type SingupResponseT = {
  message: string;
  signup: string;
  user: User;
};

export type authContextT = {
  userToken: string | null;
  setUserToken: object | null;
  setUserData: (id: string) => void;
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
        username?: string | null;
        inviteCode?: string;
      }) => Promise<void>)
    | null;

  signUpWithProvider:
    | (({
        email,
        username,
        provider,
        providerId,
      }: {
        email: string;
        username?: string | null;
        providerId: string;
        provider: string;
      }) => Promise<void>)
    | null;

  unauthorizedError: () => void;
  verifyLogin: () => void;
  isAuth: boolean;
};

export const AuthContext = createContext<authContextT>({
  userToken: null,
  setUserToken: null,
  userInfo: null,
  login: null,
  signUp: null,
  signUpWithProvider: null,
  logout: null,
  unauthorizedError: () => {},
  verifyLogin: () => {},
  isAuth: false,
  setUserData: () => {},
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
    const response = await axios.get(`${API_URL}/logout`, {
      withCredentials: true,
    });
    setUserToken(null);
    setIsAuth(false);
    console.log("response", response);
  };

  const login = async (email: string, password: string) => {
    console.log(" `${API_URL}/login`", `${API_URL}/login`);
    const response = await axios.post(
      `${API_URL}/login`,
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
    username?: string | null;
    inviteCode?: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/signup`,
        {
          email,
          password,
          username,
          inviteCode,
        },
        { withCredentials: true }
      );
      const data = response.data as SingupResponseT;

      setUserInfo((state) => {
        return { ...state, ...data.user };
      });
      setIsAuth(true);
    } catch (error) {
      console.log("failed to signup");
      unauthorizedError();
    }
  };
  const signUpWithProvider = async ({
    email,
    username,
    provider,
    providerId,
  }: {
    email: string;
    username?: string | null;
    provider: string;
    providerId: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/signup/provider`,
        {
          email,
          username,
          provider,
          providerId,
        },
        { withCredentials: true }
      );
      const data = response.data as SingupResponseT;

      //TODO load up user profile

      setUserInfo((state) => {
        return { ...state, ...data.user };
      });
      setIsAuth(true);
    } catch (error) {
      console.log("failed to signup");
      unauthorizedError();
    }
  };

  const unauthorizedError = () => {
    console.log("unauthorized log in again");
    setIsAuth(false);
  };

  async function verifyLogin() {
    const response = await axios.get(`${API_URL}/login/verify`, {
      withCredentials: true,
    });

    console.log("response", response);
    if (response.status == 200) {
      const user = response.data;
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

  async function getUserProfile() {
    //TODO get users profile from backend
    //get id and query server for user profile
  }

  const values: authContextT = {
    userToken,
    setUserToken,
    userInfo,
    login,
    logout,
    signUp,
    signUpWithProvider,
    unauthorizedError,
    verifyLogin,
    isAuth,
    setUserData: getUserProfile,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
