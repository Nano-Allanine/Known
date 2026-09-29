import "../styles/settings.css";

function Settings() {
  return (
    <div className="settings-page">

      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your KNOWN system preferences and security.</p>
        </div>
      </div>

      <div className="settings-layout">

        <div className="settings-menu">
          <button className="settings-menu-item active">
            General
          </button>

          <button className="settings-menu-item">
            Security
          </button>

          <button className="settings-menu-item">
            Notifications
          </button>

          <button className="settings-menu-item">
            Verification
          </button>
        </div>

        <div className="settings-content">

          <section className="settings-card">
            <h3>General Settings</h3>
            <p className="settings-description">
              Configure basic KNOWN system preferences.
            </p>

            <div className="setting-row">
              <div>
                <strong>System Name</strong>
                <p>Application display name</p>
              </div>

              <input
                type="text"
                value="KNOWN"
                readOnly
              />
            </div>

            <div className="setting-row">
              <div>
                <strong>System Version</strong>
                <p>Current application version</p>
              </div>

              <span className="version">1.0.0</span>
            </div>
          </section>

          <section className="settings-card">

            <h3>Security</h3>

            <div className="setting-row">
              <div>
                <strong>JWT Authentication</strong>
                <p>Secure API access using JWT tokens</p>
              </div>

              <span className="security-enabled">
                Enabled
              </span>
            </div>

            <div className="setting-row">
              <div>
                <strong>Face Verification</strong>
                <p>Biometric identity verification</p>
              </div>

              <span className="security-enabled">
                Enabled
              </span>
            </div>

            <div className="setting-row">
              <div>
                <strong>QR Verification</strong>
                <p>QR-based identity verification</p>
              </div>

              <span className="security-enabled">
                Enabled
              </span>
            </div>

          </section>

          <section className="settings-card">

            <h3>Notifications</h3>

            <div className="setting-row">
              <div>
                <strong>Verification Alerts</strong>
                <p>Receive notifications for verification events</p>
              </div>

              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span></span>
              </label>
            </div>

            <div className="setting-row">
              <div>
                <strong>Security Alerts</strong>
                <p>Receive alerts for security events</p>
              </div>

              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span></span>
              </label>
            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

export default Settings;