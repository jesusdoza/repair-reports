// type layoutProps = { children: React.ReactNode };
// import Router from "./Router";
import React from "react";

import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <h1>this is my nav</h1>
        <Navbar />
        <ul>
          <li>
            <Link to={"home"}> home</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};
