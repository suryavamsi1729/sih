import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import Home from "../pages/Home/Home";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
