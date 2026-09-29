import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="known-sidebar">

      <div className="known-logo">
        <h2>KNOWN</h2>
        <span>Identity & Verification</span>
      </div>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/verify">Verify Identity</NavLink>

        <NavLink to="/users">Users</NavLink>

        <NavLink to="/verification">Verification Logs</NavLink>

        <NavLink to="/qr-generator">QR Generator</NavLink>

        <NavLink to="/settings">Settings</NavLink>
      </nav>

    </aside>
  );
};

export default Sidebar;