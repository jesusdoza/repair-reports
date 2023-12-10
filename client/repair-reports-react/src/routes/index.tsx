import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import App from "../components/App";

export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/tabels",
    element: (
      <Layout>
        <h1>tables</h1>
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
]);
