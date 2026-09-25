import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DistrictPage from "./pages/DistrictPage";
import Districts from "./pages/Districts";
import Location from "./pages/Location";
import Food from "./pages/Food";
import Tourism from "./pages/Tourism";
import Data from "./pages/Data";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Individual District Details */}
        <Route
          path="/district/:districtName"
          element={<DistrictPage />}
        />

        {/* All Districts Page */}
        <Route
          path="/districts"
          element={<Districts />}
        />
        <Route
  path="/Location"
  element={<Location />}
/>
<Route path="/food" element={<Food />} />
<Route path="/tourism" element={<Tourism />} />
<Route path="/data" element={<Data />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;