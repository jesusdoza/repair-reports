export default function Navbar() {
  return (
    <>
      <div className="full-nav navbar bg-base-100">
        <div className="flex-1 ">
          <a
            data-test="full-nav"
            className="logo btn btn-ghost normal-case text-xl">
            Circuit Chaser
          </a>
        </div>
        <div className="flex-1">
          <ul className=" menu flex-1 menu-horizontal p-0">
            <li className=" search-area">
              <h1 className="bg-base-100">SEARCH BAR HERE</h1>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/repair">Latest Reports</a>
            </li>
            <li>
              <a href="/repairform">Create Report</a>
            </li>
            <li>
              <a href="/repair/searchpage">Search</a>
            </li>

            <li tabIndex={0}>
              <a>
                <div className="w-10  ">
                  <h1>USERNAME HERE</h1>
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </a>
              <ul className="right-0  submenu above p-2 bg-base-100">
                <li>
                  <a
                    href="/profile"
                    className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a href="/logout">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
