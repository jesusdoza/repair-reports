import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SignUpCard from "./SignUpCard";

import LoginCard from "./LoginCard";

export default function LoginModal() {
  return (
    <>
      <LoginCard />
      <SignUpCard />
    </>
  );
}
