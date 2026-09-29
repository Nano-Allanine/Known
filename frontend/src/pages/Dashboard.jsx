import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboardData } from "../features/dashboard/dashboard";

import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Identity & Verification</p>
        </div>

        <button
          className="verify-button"
          onClick={() => navigate("/verify")}
        >
          + Verify Identity
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Identities</span>
          <h2>{dashboardData.total_identities}</h2>
          <small>Registered identities</small>
        </div>

        <div className="stat-card">
          <span>Verified</span>
          <h2>{dashboardData.verified}</h2>
          <small>Successful verifications</small>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <h2>{dashboardData.pending}</h2>
          <small>Pending identities</small>
        </div>

        <div className="stat-card">
          <span>Failed</span>
          <h2>{dashboardData.failed}</h2>
          <small>Verification failures</small>
        </div>

      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">

        {/* Recent Verifications */}
        <section className="dashboard-card">

  <div className="card-header">
    <h3>Verification Methods</h3>
  </div>

  <div className="method">
    <div>
      <strong>Facial Recognition</strong>
      <p>
        {dashboardData.face_verifications} verifications
      </p>
    </div>

    <strong>
      {dashboardData.face_verifications}
    </strong>
  </div>

  <div className="method">
    <div>
      <strong>QR Verification</strong>
      <p>
        {dashboardData.qr_verifications} verifications
      </p>
    </div>

    <strong>
      {dashboardData.qr_verifications}
    </strong>
  </div>

</section>

        {/* Verification Methods */}
        <section className="dashboard-card">

          <div className="card-header">
            <h3>Verification Methods</h3>
          </div>

          <div className="method">
            <div>
              <strong>Facial Recognition</strong>
              <p>Face-based identity verification</p>
            </div>
          </div>

          <div className="method">
            <div>
              <strong>QR Verification</strong>
              <p>QR-based identity verification</p>
            </div>
          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;