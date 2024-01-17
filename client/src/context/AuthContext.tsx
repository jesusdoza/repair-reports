import React, { createContext, useEffect, useState } from "react";

type User = { username: string };

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>("logged in");
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

  // const auth = getAuth();

  // if (!userToken) return <LoginModal />;
  if (!userToken) return <h1>NOT LOGGED IN</h1>;

  const values = { userToken, setUserToken, userInfo };

  return (
    <AuthContext.Provider value={values}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
