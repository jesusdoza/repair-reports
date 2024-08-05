import React from "react";

import ColabImage from "../../assets/HomePage/live_collaboration-rafiki.svg";
import CircuitBoardHeroImage from "../../assets/HomePage/Printed-circuit-board-pana.svg";
import FirmwareImage from "../../assets/HomePage/Firmware-amico.svg";
import { Link } from "react-router-dom";

type LinkDataT = {
  url: string;
  label: string;
};

const homePageNavLinks: LinkDataT[] = [
  {
    url: "/login",
    label: "Log in",
  },
  {
    url: "/dashboard",
    label: "Dashboard",
  },
  {
    url: "/latest",
    label: "Latest Repairs",
  },
  {
    url: "/repairform",
    label: "Create Repair",
  },
  {
    url: "/search",
    label: "Search",
  },
  {
    url: "/login",
    label: "Sign up",
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative bg-white z-10  pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <div>
              <div className="relative px-4  pt-6 sm:px-6 lg:px-8">
                <nav
                  className="text-base-100 bg-white relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global">
                  <div className="navbar bg-content ">
                    <div className="navbar-start">
                      <div
                        data-test="mobile-nav"
                        className="dropdown">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost lg:hidden">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 6h16M4 12h8m-8 6h16"
                            />
                          </svg>
                        </label>
                        <ul
                          data-test="mobile-menu"
                          tabIndex={0}
                          className="bg-white menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                          {homePageNavLinks.map((link) => {
                            return (
                              <li>
                                <Link to={link.url}>{link.label}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* <!-- mobile nav end --> */}
                    </div>
                    <div className="navbar-center hidden md:visible lg:flex ">
                      <ul
                        data-test="full-menu"
                        className="menu menu-horizontal p-0">
                        {homePageNavLinks.map((link) => {
                          return (
                            <li>
                              <Link to={link.url}>{link.label}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="navbar-end">
                      {/* <!-- <a className="btn">Get started</a> --> */}
                    </div>
                  </div>
                </nav>
                {/* <!-- nav --> */}
              </div>

              <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Circuit Chaser</span>
                    <span className="block text-accent xl:inline">
                      Data to Power Back Up{" "}
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0"></p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to={"/login"}
                        className="flex w-full items-center justify-center rounded-md border border-transparent  bg-accent px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              loading="lazy"
              src={CircuitBoardHeroImage}
              alt="circuit repair"
            />
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h2 className="text-5xl font-bold">Collaborate</h2>
            <p>
              Find obsolete parts or new compatible ones for your hardware
              application.
              <br />
            </p>
          </div>
          <img
            loading="lazy"
            src={ColabImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h2 className="text-5xl font-bold">Document repairs </h2>
            <p className="py-6">
              Circuit tracing is not fast or easy so back up your progress in an
              easy to search database built for you.{" "}
            </p>
          </div>
          <img
            loading="lazy"
            src={FirmwareImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </div>

      <footer>
        <footer className="footer p-10 bg-base-200 text-base-content">
          <div>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="fill-current">
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            {/* <p>ACME Industries Ltd.Providing reliable tech since 1992</p> */}
          </div>
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
      </footer>
    </div>
  );
}
