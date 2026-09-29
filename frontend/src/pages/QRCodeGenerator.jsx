import "../styles/qr-generator.css";

function QRCodeGenerator() {
  return (
    <div className="qr-page">

      <div className="page-header">
        <div>
          <h1>QR Code Generator</h1>
          <p>Create secure QR credentials for registered identities.</p>
        </div>
      </div>

      <div className="qr-layout">

        <section className="qr-form-card">
          <h3>Generate Credential</h3>
          <p className="card-description">
            Select an identity and generate a KNOWN QR credential.
          </p>

          <div className="form-group">
            <label>KNOWN ID</label>
            <input
              type="text"
              placeholder="e.g. KNOWN-0001"
            />
          </div>

          <div className="form-group">
            <label>Identity Name</label>
            <input
              type="text"
              placeholder="Enter identity name"
            />
          </div>

          <div className="form-group">
            <label>Credential Type</label>

            <select>
              <option>Identity Verification</option>
              <option>Temporary Verification</option>
            </select>
          </div>

          <div className="form-group">
            <label>Expiration</label>

            <select>
              <option>Never</option>
              <option>24 Hours</option>
              <option>7 Days</option>
              <option>30 Days</option>
            </select>
          </div>

          <button className="generate-button">
            Generate QR Code
          </button>
        </section>

        <section className="qr-preview-card">

          <div className="qr-preview-header">
            <h3>QR Preview</h3>
            <span>Credential</span>
          </div>

          <div className="qr-placeholder">
            <div className="qr-pattern">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="qr-identity">
            <strong>KNOWN-0001</strong>
            <p>Identity Verification Credential</p>
          </div>

          <button className="download-button">
            Download QR
          </button>

        </section>

      </div>

      <section className="qr-security-card">

        <div>
          <h3>QR Credential Security</h3>
          <p>
            Generated credentials are associated with a registered
            identity and can be used during KNOWN verification.
          </p>
        </div>

        <div className="security-status">
          <span>Security</span>
          <strong>Protected</strong>
        </div>

      </section>

    </div>
  );
}

export default QRCodeGenerator;