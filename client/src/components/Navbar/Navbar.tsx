import { Link } from "react-router-dom";
import Search from "../Search/Search";
import useAuthContext from "../../hooks/useAuthContext";
import { v4 } from "uuid";

export type NavLinkT = {
  url: string;
  label: string;
};

type NavbarPropsT = {
  mainMenu: NavLinkT[];
  profileMenu: NavLinkT[];
};

export default function Navbar({
  mainMenu = [],
  profileMenu = [],
}: NavbarPropsT): React.ReactNode {
  const { userInfo } = useAuthContext();

  function MenuItem({ label, url }: NavLinkT) {
    return (
      <Link to={url}>
        <span>{label}</span>
      </Link>
    );
  }

  const NavbarMenu = () => {
    return mainMenu.map((item) => {
      return (
        <li key={v4()}>
          <MenuItem
            label={item.label}
            url={item.url}
          />
        </li>
      );
    });
  };

  return (
    <>
      <div className="navbar gap-3 px-3 bg-secondary text-text-primary">
        <div className="flex-1">
          <div>
            <Link
              to={"/"}
              className="btn btn-ghost text-xl">
              Circuit Chaser
            </Link>
          </div>
        </div>

        <ul className=" flex menu menu-horizontal gap-1">
          <NavbarMenu />
          <li
            key={v4()}
            className="form-control">
            <Search />
          </li>
        </ul>
        <ProfileNavItem
          username={userInfo?.username}
          menu={profileMenu}
        />
      </div>
    </>
  );
}

function ProfileNavItem({
  menu,
  username = "",
}: {
  menu: NavLinkT[];
  username?: string;
}) {
  function MenuItem(item: NavLinkT) {
    return (
      <Link to={item.url}>
        <span className="justify-between">
          {item.label}
          <span className="badge">New</span>
        </span>
      </Link>
    );
  }

  const menuItems = menu.map((item) => {
    return (
      <li key={v4()}>
        <MenuItem
          label={item.label}
          url={item.url}
        />
      </li>
    );
  });
  return (
    <div className="dropdown dropdown-end ">
      <div
        data-testid="nav-profile-menu"
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="USERIMAGE"
            src="#"
          />
        </div>
        <span>{username}</span>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[30] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {menuItems}
      </ul>
    </div>
  );
}
