import React, { useState } from 'react';
import '../../styles/admin/ProductTable.css';
import '../../styles/admin/UserTable.css'; 

const UserTable = ({ users, handleDeleteUser, handleRoleChange, handleToggleBlock }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
                👥 No registered users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className={user.isBlocked ? 'user-row-blocked' : ''}>
                <td>
                  <div className={`user-avatar ${user.isBlocked ? 'avatar-blocked' : ''}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td>
                  <strong>{user.name}</strong>
                  {user.isBlocked && <span className="blocked-tag">Blocked</span>}
                </td>
                <td>{user.email}</td>
                <td>
                  <select 
                    className={`role-select ${user.role}`}
                    value={user.role}
                    disabled={user.isBlocked} 
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">👤 User</option>
                    <option value="admin">🔑 Admin</option>
                  </select>
                </td>
                <td>
                  <span className={`status-badge ${user.isBlocked ? 'low-stock' : 'in-stock'}`}>
                    {user.isBlocked ? '🚫 Blocked' : '🟢 Active'}
                  </span>
                </td>
                <td>{user.joinedDate}</td>
                <td>
                  <button 
                    className="action-btn view" 
                    onClick={() => setSelectedUser(user)} 
                    title="View User Details"
                  >
                    👁️
                  </button>

                  <button 
                    className={`action-btn ${user.isBlocked ? 'unblock-btn' : 'block-btn'}`} 
                    onClick={() => handleToggleBlock(user._id, user.isBlocked)} 
                    title={user.isBlocked ? "Unblock User" : "Block User"}
                  >
                    {user.isBlocked ? '🔄' : '🚫'}
                  </button>

                  <button 
                    className="action-btn delete" 
                    onClick={() => handleDeleteUser(user._id)} 
                    title="Delete Account"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Customer Profile Details</h3>
              <button className="close-modal-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            
            <div className="modal-body user-modal-body">
              <div className="user-profile-card">
                <div className="large-avatar">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <h2>{selectedUser.name}</h2>
                <span className={`modal-category ${selectedUser.role}`}>{selectedUser.role.toUpperCase()}</span>
                <p className="user-joined-text">Joined on {selectedUser.joinedDate}</p>
              </div>

              <div className="user-history-section">
                <div className="history-block">
                  <h4>📧 Contact Information</h4>
                  <p><strong>Email Address:</strong> {selectedUser.email}</p>
                  <p><strong>Phone Number:</strong> {selectedUser.phone || '+91 99988 87766'}</p>
                </div>

                <div className="history-block">
                  <h4>📊 Shopping Performance</h4>
                  <div className="stats-grid-mini">
                    <div className="stat-box-mini">
                      <span>Total Orders</span>
                      <strong>{selectedUser.totalOrders || 0} Orders</strong>
                    </div>
                    <div className="stat-box-mini">
                      <span>Total Spend</span>
                      <strong className="spend-amount">₹{Number(selectedUser.totalSpend || 0).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>

                <div className="history-block">
                  <h4>⚠️ Account Status</h4>
                  <p>Status: <strong style={{ color: selectedUser.isBlocked ? '#ef4444' : '#10b981' }}>
                    {selectedUser.isBlocked ? 'Suspended / Blocked' : 'Active / Allowed'}
                  </strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;