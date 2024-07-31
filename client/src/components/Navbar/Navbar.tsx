import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Search from "../Search/Search";

export type NavLinkT = {
  url: string;
  label: string;
};

type NavbarPropsT = {
  menu: NavLinkT[];
};

export default function Navbar({ menu = [] }: NavbarPropsT): React.ReactNode {
  const { logout } = useAuthContext();

  const navbarMenu = menu.map((item) => {
    return (
      <MenuItem
        label={item.label}
        url={item.url}
      />
    );
  });
  return (
    <>
      <div className="navbar bg-base-100 gap-3">
        <div className="flex-1">
          <div>
            <a className="btn btn-ghost text-xl">Circuit Chaser</a>
          </div>
        </div>

        <ul className=" flex menu menu-horizontal gap-1">
          {navbarMenu}

          <li className="form-control">
            <Search></Search>
          </li>

          <li className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="USERIMAGE"
                  src="#"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[30] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link to={"/profile"}>
                  <span className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"#"}>Settings</Link>
              </li>
              <li>
                <Link
                  onClick={() => logout && logout()}
                  to={"#"}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

function MenuItem({ label, url }: NavLinkT) {
  return (
    <li>
      <Link to={url}>
        <span>{label}</span>
      </Link>
    </li>
  );
}
