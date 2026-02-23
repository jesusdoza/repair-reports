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
      className="px-4 py-2 rounded-md text-foreground hover:bg-primary/10 transition-colors font-medium">
      <span>{label}</span>
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
    <ul className="flex flex-row gap-2 items-center bg-transparent">{items}</ul>
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
      <div className="w-full bg-secondary shadow-sm sticky top-0 z-50">
        <nav className="navbar max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Link
              to="/"
              className="text-2xl font-bold text-primary-foreground tracking-tight px-2 py-1 rounded-md hover:bg-primary/20 transition-colors">
              Circuit Chaser
            </Link>
            <div className="hidden lg:block">
              <NavbarMenu mainMenu={mainMenu} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Search />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-border hover:border-primary transition-colors">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {userInfo?.imageUrl ? (
                    <img
                      alt="User avatar"
                      src={userInfo?.imageUrl}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-lg font-bold text-muted-foreground">
                      ?
                    </span>
                  )}
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-card rounded-box mt-3 w-52 p-2 shadow z-40 border border-border">
                <ProfileNavItem menu={profileMenu} />
                {userInfo?.username && (
                  <li className="mt-2 px-2 text-xs text-muted-foreground">
                    {userInfo.username}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
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
      <Link
        to={item.url}
        className="flex items-center px-3 py-2 rounded-md hover:bg-primary/10 text-foreground transition-colors">
        <span>{item.label}</span>
      </Link>
    );
  }

  const menuItems = menu.map((item) => (
    <li key={v4()}>
      <MenuItem
        label={item.label}
        url={item.url}
      />
    </li>
  ));

  return <>{menuItems}</>;
}
