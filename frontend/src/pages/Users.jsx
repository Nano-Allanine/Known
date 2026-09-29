import "../styles/users.css";

function Users() {
  return (
    <div className="users-page">

      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage registered identities and their access status.</p>
        </div>

        <button className="primary-button">
          + Add User
        </button>
      </div>

      <div className="users-toolbar">
        <input
          type="text"
          placeholder="Search users..."
        />

        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
          <option>Revoked</option>
        </select>
      </div>

      <div className="users-card">

        <div className="table-header">
          <span>User</span>
          <span>KNOWN ID</span>
          <span>Status</span>
          <span>Verification</span>
          <span>Actions</span>
        </div>

        <div className="user-row">
          <div className="user-info">
            <div className="avatar">AK</div>
            <div>
              <strong>Kablega Allan</strong>
              <p>kabalegaallan9@gmail.com</p>
            </div>
          </div>

          <span>KNOWN-0001</span>

          <span className="user-status active">
            Active
          </span>

          <span className="verified-text">
            Verified
          </span>

          <button className="action-button">
            View
          </button>
        </div>

        <div className="user-row">
          <div className="user-info">
            <div className="avatar">MN</div>
            <div>
              <strong>Evelyn Patience</strong>
              <p>evelyn@gmail.com</p>
            </div>
          </div>

          <span>KNOWN-0002</span>

          <span className="user-status pending">
            Pending...
          </span>

          <span className="pending-text">
            Pending...
          </span>

          <button className="action-button">
            View
          </button>
        </div>

        <div className="user-row">
          <div className="user-info">
            <div className="avatar">DK</div>
            <div>
              <strong>Dickens Ampumuza</strong>
              <p>dickens@gmail.com</p>
            </div>
          </div>

          <span>KNOWN-0003</span>

          <span className="user-status active">
            Active
          </span>

          <span className="verified-text">
            Verified
          </span>

          <button className="action-button">
            View
          </button>
        </div>

      </div>

    </div>
  );
}

export default Users;