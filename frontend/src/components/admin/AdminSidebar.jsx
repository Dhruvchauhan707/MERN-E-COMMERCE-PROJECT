import React from 'react';
import '../../styles/admin/AdminSidebar.css';

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen }) => {
  return (
    <div className={`admin-sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
      {/* 1. Brand Section */}
      <div className="sidebar-brand">
        <h2>E-Shop Admin</h2>
      </div>

      {/* 2. Menu Links Section */}
      <ul className="sidebar-menu">
        <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
          <span>📊</span> Dashboard
        </li>
        <li className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>
          <span>📂</span> Categories
        </li>
        <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
          <span>📦</span> Products
        </li>
        <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
          <span>🛒</span> Orders
        </li>
        <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
          <span>👥</span> Users
        </li>
      </ul>

      {/* ✨ 3. NEW: BOTTOM USER PROFILE & LOGOUT SECTION */}
      <div className="sidebar-footer">
        <div className="sidebar-user-info">
          <div className="user-avatar-mini">A</div>
          <div className="user-text">
            <span className="user-name">Admin</span>
            <span className="user-role">Super Admin</span>
          </div>
        </div>
        <button className="sidebar-logout-btn" onClick={() => alert('Logging out...')}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;