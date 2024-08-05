import { NavLinkT } from "../components/Navbar/Navbar";

const navMenu: NavLinkT[] = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Latest Reports",
    url: "/latest",
  },
  {
    label: "Create Report",
    url: "/repairform",
  },
];

const profileMenu: NavLinkT[] = [
  {
    label: "Profile",
    url: "/profile",
  },
  {
    label: "Settings",
    url: "#",
  },
  {
    label: "Logout",
    url: "/logout",
  },
];

export { navMenu, profileMenu };
