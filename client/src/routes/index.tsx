import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import RepairFormPage from "../pages/CreateRepairFormPage";
import DashboardPage from "../pages/dashboard/DashboardPageContainer";
import { RepairInfoPage } from "../pages/RepairInfoPage";
import EditRepairPageV2 from "../pages/EditRepairPageV2";
import SearchPage from "../pages/search/SearchPage";
import LogoutPage from "../pages/LogoutPage";

import HomePage from "../pages/home/HomePage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import LoginSignupContainer from "../components/LoginSignUp/LoginSignupContainer";
import ProtectedRoute from "../components/ProtectedRoute";
import InvitePage from "../pages/invite/InvitePage";
import DeleteRepairPage from "../pages/delete/DeleteRepairPage";
// import SignupSetupPage from "../pages/signup/SignupSetupPage";
import SignUpPage from "../pages/signup/SignUpPage";
import ClerkRedirectPage from "../pages/signin/ClerkRedirectPage";
import ClerkSignInPage from "../pages/signin/ClerkSignInPage";

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
    path: "/login",
    element: (
      <ErrorBoundary componentName="LatestRepairsPage">
        <LoginSignupContainer />
      </ErrorBoundary>
    ),
  },
  {
    path: "/login/clerk",
    element: (
      <ErrorBoundary componentName="LatestRepairsPage">
        <ClerkSignInPage />
      </ErrorBoundary>
    ),
  },

  //load clerk user profile
  {
    path: "/login/clerk/loaduser",
    element: (
      <ErrorBoundary componentName="ClerkRedirectPage">
        <ClerkRedirectPage />
      </ErrorBoundary>
    ),
  },

  //setup user profile after clerk signup
  // {
  //   path: "/signup/setup/clerk",
  //   element: (
  //     <ErrorBoundary componentName="SignupPage">
  //       <SignupSetupPage />
  //     </ErrorBoundary>
  //   ),
  // },

  //clerk signupPage
  {
    path: "/signup/clerk",
    element: (
      <ErrorBoundary componentName="SigninPage">
        <SignUpPage />
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
    path: "/repair/delete/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <ErrorBoundary componentName="DeleteRepairPage">
            <DeleteRepairPage />
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
