import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RepairFormPage from "../pages/CreateRepairFormPage";
import DashboardPage from "../pages/dashboard/DashboardPageContainer";
import { RepairInfoPageContainer } from "../pages/RepairInfoPageContainer";
import EditRepairPageV2 from "../pages/EditRepairPageV2";
import SearchPage from "../pages/search/SearchPage";
import LogoutPage from "../pages/LogoutPage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Layout>
        <ErrorBoundary componentName="LatestRepairsPage">
          <LatestRepairsPage />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <ErrorBoundary componentName="DashboardPage">
          <DashboardPage />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <ErrorBoundary componentName="ProfilePage">
          <ProfilePage />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/repairform",
    element: (
      <Layout>
        <ErrorBoundary componentName="RepairFormPage">
          <RepairFormPage />
        </ErrorBoundary>
      </Layout>
    ),
  },

  // edit repair
  {
    path: "/repair/edit/:id",
    element: (
      <Layout>
        <ErrorBoundary componentName="EditRepairPageV2">
          <EditRepairPageV2 />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/repair/:repair_id",
    element: (
      <Layout>
        <ErrorBoundary componentName="RepairInfoPageContainer">
          <RepairInfoPageContainer />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/react",
    element: (
      <Layout>
        <ErrorBoundary componentName="RepairInfoPageContainer">
          <LatestRepairsPage />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/search",
    element: (
      <Layout>
        <ErrorBoundary componentName="RepairInfoPageContainer">
          <SearchPage />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: "/logout",
    element: (
      <Layout>
        <LogoutPage />
      </Layout>
    ),
  },
  // {
  //   path: "/search/:search/:limit/:page",
  //   element: (
  //     <Layout>
  //       <SearchPage />
  //     </Layout>
  //   ),
  // },
]);
