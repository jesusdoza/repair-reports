import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/ProfilePage";
import RepairFormPage from "../pages/RepairFormPage";
import DashboardPage from "../pages/DashboardPage";
import { RepairInfoPage } from "../pages/RepairInfoPage";
export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Layout>
        <LatestRepairsPage />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <DashboardPage></DashboardPage>
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <ProfilePage></ProfilePage>
      </Layout>
    ),
  },
  {
    path: "/repairform",
    element: (
      <Layout>
        <RepairFormPage></RepairFormPage>
      </Layout>
    ),
  },
  {
    path: "/repair/:repair_id",
    element: (
      <Layout>
        <RepairInfoPage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <h1>default</h1>
      </Layout>
    ),
  },
]);
