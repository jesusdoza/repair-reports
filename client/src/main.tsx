import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/">
        <AuthContextProvider>
          <RouterProvider router={routes} />
        </AuthContextProvider>
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
