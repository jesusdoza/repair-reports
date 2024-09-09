import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RepairFormPage from "../pages/CreateRepairFormPage";
import DashboardPage from "../pages/Dashboard/DashboardPageContainer";
import { RepairInfoPage } from "../pages/RepairInfoPage";
import EditRepairPageV2 from "../pages/EditRepairPageV2";
import SearchPage from "../pages/Search/SearchPage";
import LogoutPage from "../pages/LogoutPage";

import HomePage from "../pages/Home/HomePage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import LoginSignupContainer from "../components/LoginSignUp/LoginSignupContainer";
import ProtectedRoute from "../components/ProtectedRoute";
import InvitePage from "../pages/Invite/InvitePage";

export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <ErrorBoundary componentName="HomePage">
        <HomePage />
      </ErrorBoundary>
    ),
  },
  {
    // index: true,
    path: "/login",
    element: (
      <ErrorBoundary componentName="LatestRepairsPage">
        <LoginSignupContainer />
      </ErrorBoundary>
    ),
  },
  {
    // index: true,
    path: "/latest",
    element: (
      <ProtectedRoute>
        <ErrorBoundary componentName="LatestRepairsPage">
          <Layout>
            <LatestRepairsPage />
          </Layout>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="DashboardPage">
            <DashboardPage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="ProfilePage">
            <ProfilePage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/repairform",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="RepairFormPage">
            <RepairFormPage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },

  // edit repair
  {
    path: "/repair/edit/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="EditRepairPageV2">
            <EditRepairPageV2 />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/repair/:repair_id",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="RepairInfoPageContainer">
            <RepairInfoPage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/react",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="RepairInfoPageContainer">
            <LatestRepairsPage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="RepairInfoPageContainer">
            <SearchPage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/invite",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="InvitePage">
            <InvitePage />
          </ErrorBoundary>
        </Layout>
      </ProtectedRoute>
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
