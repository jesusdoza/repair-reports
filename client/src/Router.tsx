import { BrowserRouter, Route, Routes } from "react-router-dom";
import LatestRepairs from "./pages/LatestRepairs";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index={true}
          element={<LatestRepairs></LatestRepairs>}
        />
        <Route
          path="/blog/*"
          element={<>blog</>}
        />
      </Routes>
    </BrowserRouter>
  );
}
