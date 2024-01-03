import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairs from "../pages/LatestRepairs";
export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Layout>
        <LatestRepairs />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <h1>dashboard</h1>
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <h1>profile</h1>
      </Layout>
    ),
  },
  {
    path: "/repairform",
    element: (
      <Layout>
        <h1>create report</h1>
      </Layout>
    ),
  },
]);
