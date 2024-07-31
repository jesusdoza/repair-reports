import { Link } from "react-router-dom";
import Search from "../Search/Search";

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
  function MenuItem({ label, url }: NavLinkT) {
    return (
      <li>
        <Link to={url}>
          <span>{label}</span>
        </Link>
      </li>
    );
  }

  const NavbarMenu = () => {
    return mainMenu.map((item) => {
      return (
        <MenuItem
          label={item.label}
          url={item.url}
        />
      );
    });
  };
  return (
    <>
      <div className="navbar bg-base-100 gap-3 px-3">
        <div className="flex-1">
          <div>
            <a className="btn btn-ghost text-xl">Circuit Chaser</a>
          </div>
        </div>

        <ul className=" flex menu menu-horizontal gap-1">
          <NavbarMenu />
          <li className="form-control">
            <Search />
          </li>
        </ul>
        <ProfileNavItem menu={profileMenu} />
      </div>
    </>
  );
}

function ProfileNavItem({ menu }: { menu: NavLinkT[] }) {
  function MenuItem(item: NavLinkT) {
    return (
      <li>
        <Link to={item.url}>
          <span className="justify-between">
            {item.label}
            <span className="badge">New</span>
          </span>
        </Link>
      </li>
    );
  }

  const menuItems = menu.map((item) => {
    return (
      <MenuItem
        label={item.label}
        url={item.url}
      />
    );
  });
  return (
    <div className="dropdown dropdown-end ">
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
        {menuItems}
      </ul>
    </div>
  );
}
