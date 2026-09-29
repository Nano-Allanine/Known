import "../styles/verification.css";

function Verification() {
  return (
    <div className="verification-page">

      <div className="page-header">
        <div>
          <h1>Verification Logs</h1>
          <p>Monitor identity verification activity across KNOWN.</p>
        </div>

        <button className="primary-button">
          Export Logs
        </button>
      </div>

      <div className="verification-stats">

        <div className="verification-stat">
          <span>Total Attempts</span>
          <strong>1,248</strong>
        </div>

        <div className="verification-stat">
          <span>Successful</span>
          <strong>1,086</strong>
        </div>

        <div className="verification-stat">
          <span>Failed</span>
          <strong>38</strong>
        </div>

        <div className="verification-stat">
          <span>Pending</span>
          <strong>124</strong>
        </div>

      </div>

      <div className="verification-card">

        <div className="verification-toolbar">

          <input
            type="text"
            placeholder="Search verification logs..."
          />

          <select>
            <option>All Methods</option>
            <option>Facial Recognition</option>
            <option>QR Code</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Verified</option>
            <option>Failed</option>
            <option>Pending</option>
          </select>

        </div>

        <div className="logs-table">

          <div className="logs-header">
            <span>Identity</span>
            <span>Method</span>
            <span>Status</span>
            <span>Date & Time</span>
            <span>Action</span>
          </div>

          <div className="log-row">
            <div>
              <strong>KNOWN-0001</strong>
              <small>John Akello</small>
            </div>

            <span>Facial Recognition</span>

            <span className="log-status success">
              Verified
            </span>

            <span>21 Sep 2026, 10:42</span>

            <button>View</button>
          </div>

          <div className="log-row">
            <div>
              <strong>KNOWN-0002</strong>
              <small>Mary Namukasa</small>
            </div>

            <span>QR Code</span>

            <span className="log-status success">
              Verified
            </span>

            <span>21 Sep 2026, 10:18</span>

            <button>View</button>
          </div>

          <div className="log-row">
            <div>
              <strong>KNOWN-0003</strong>
              <small>David Kato</small>
            </div>

            <span>Facial Recognition</span>

            <span className="log-status failed">
              Failed
            </span>

            <span>21 Sep 2026, 09:57</span>

            <button>View</button>
          </div>

          <div className="log-row">
            <div>
              <strong>KNOWN-0004</strong>
              <small>Sarah Achieng</small>
            </div>

            <span>QR Code</span>

            <span className="log-status pending">
              Pending...
            </span>

            <span>21 Sep 2026, 09:31</span>

            <button>View</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Verification;