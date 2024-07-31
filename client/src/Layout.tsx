// type layoutProps = { children: React.ReactNode };
// import Router from "./Router";
import React from "react";
import { navMenu, profileMenu } from "./config/NavBar.ts";

import Navbar from "./components/Navbar/Navbar.tsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <>
      <nav>
        <ErrorBoundary componentName="Navbar">
          <Navbar
            mainMenu={navMenu}
            profileMenu={profileMenu}
          />
        </ErrorBoundary>
      </nav>
      {children}
    </>
  );
};
