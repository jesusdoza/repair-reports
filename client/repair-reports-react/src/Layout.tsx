// type layoutProps = { children: React.ReactNode };
import Router from "./Router";
import { Link } from "react-router-dom";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <h1>this is my nav</h1>
        <ul>
          <li>
            <Link to={"home"}> home</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
