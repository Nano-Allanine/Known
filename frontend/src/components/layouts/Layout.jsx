import '../../styles/sidebar.css'
import '../../styles/layout.css'
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="known-layout">

      <aside className="sidebar">

        <div className="sidebar-brand">
          <h1>KNOWN</h1>
          <small><i>We know who you are!</i></small>
        </div>

        <nav className="sidebar-nav">

          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/verify">
            Verify Identity
          </NavLink>

          <NavLink to="/users">
            Users
          </NavLink>

          <NavLink to="/verification">
            Verification Logs
          </NavLink>

          <NavLink to="/qr-generator">
            QR Generator
          </NavLink>

          <NavLink to="/settings">
            Settings
          </NavLink>

        </nav>

      </aside>

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;
