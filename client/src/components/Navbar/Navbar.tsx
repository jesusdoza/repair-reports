import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { v4 } from "uuid";
import { useUser } from "@clerk/clerk-react";

export type NavLinkT = {
  url: string;
  label: string;
};

type NavbarPropsT = {
  mainMenu: NavLinkT[];
  profileMenu: NavLinkT[];
};

//button on navbar
function MenuItem({ label, url }: NavLinkT) {
  return (
    <Link
      to={url}
      className="">
      <span className="text-black">{label}</span>
    </Link>
  );
}

const NavbarMenu = ({ mainMenu }: { mainMenu: NavLinkT[] }) => {
  if (!mainMenu || mainMenu.length === 0) return null;
  const items = mainMenu.map((item) => {
    return (
      <li
        className=""
        key={v4()}>
        <MenuItem
          label={item.label}
          url={item.url}
        />
      </li>
    );
  });

  return (
    <ul className="menu menu-vertical lg:menu-horizontal bg-secondary rounded-box ">
      {items}
    </ul>
  );
};

export default function Navbar({
  mainMenu = [],
  profileMenu = [],
}: NavbarPropsT): React.ReactNode {
  // const { userInfo } = useAuthContext();
  const { user: userInfo, isLoaded } = useUser();

  console.log("userInfo", userInfo);

  return (
    <>
      {/* <div className="navbar gap-3 px-3 bg-secondary text-text-primary">
        <div className="flex-1">
          <div>
            <Link
              to={"/"}
              className="btn btn-ghost text-xl">
              Circuit Chaser
            </Link>
          </div>
        </div>

        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box bg-secondary ">
          <NavbarMenu mainMenu={mainMenu} />
          <li
            key={v4()}
            className="form-control text-white">
            <Search />
          </li>

          <li className="form-control text-white">
            <ProfileNavItem
              username={userInfo?.username}
              menu={profileMenu}
            />
          </li>
        </ul>
      </div> */}
      <div>
        <div className="navbar bg-secondary shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <NavbarMenu mainMenu={mainMenu} />
          <div className="flex gap-2">
            <Search />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={userInfo?.imageUrl}
                  />
                </div>
              </div>
              <div>
                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow z-40">
                  <ProfileNavItem menu={profileMenu} />
                </ul>
                {userInfo?.username}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileNavItem({
  menu,
}: {
  menu: NavLinkT[];
  username?: string | null | undefined;
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
    <ul
      tabIndex={0}
      className="mt-3 z-[30] p-2 bg-base-100 w-52">
      {menuItems}
    </ul>
  );
}
