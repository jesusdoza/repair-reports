export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 gap-3">
        <div className="flex-1">
          <div>
            <a className="btn btn-ghost text-xl">Circuit Chaser</a>
          </div>
        </div>

        <ul className=" flex menu menu-horizontal gap-1">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/repair">Latest Reports</a>
          </li>
          <li>
            <a href="/repairform">Create Report</a>
          </li>
          <li className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </li>

          <li className="dropdown dropdown-end">
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
