import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/">
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </ClerkProvider>
  </React.StrictMode>
);
