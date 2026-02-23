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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="mb-2">
        <ErrorBoundary componentName="Navbar">
          <Navbar
            mainMenu={navMenu}
            profileMenu={profileMenu}
          />
        </ErrorBoundary>
      </nav>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
