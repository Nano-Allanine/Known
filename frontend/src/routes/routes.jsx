import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import VerifyIdentity from "../pages/VerifyIdentity";
import Users from "../pages/Users";
import Verification from "../pages/Verification";
import QRCodeGenerator from "../pages/QRCodeGenerator";
import Layout from "../components/layouts/Layout";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Protected application */}
      <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/verify"
          element={<VerifyIdentity />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/verification"
          element={<Verification />}
        />

        <Route
          path="/qr-generator"
          element={<QRCodeGenerator />}
        />
      <Route path="/settings"
       element={<Settings />} />
    </Route>
      </Route>

    </Routes>
  );
}

export default AppRoutes;