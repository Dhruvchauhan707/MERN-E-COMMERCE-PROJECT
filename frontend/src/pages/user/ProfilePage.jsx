import React, { useState, useEffect } from 'react';
import '../../styles/user/ProfilePage.css';
import axios from "axios";
import { useAddress } from "../../Hooks/useAddress";
import { useProfile } from "../../Hooks/useProfile";
import { useOrders } from "../../Hooks/useOrders";
import AddressModal
  from "../../components/user/AddressModal";
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {

  const [activeTab, setActiveTab] = useState("profile");
  const [editingAddress, setEditingAddress] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const {
    addresses,
    createAddress,
    updateAddress,
    deleteAddress
  } = useAddress();

  const orderData = useOrders();

  const { user } = useProfile();
  const { orders } = useOrders();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleSubmit = async () => {
    try {

      if (editingAddress) {
        await updateAddress(editingAddress._id, formData);
      } else {
        await createAddress(formData);
      }

      setShowModal(false);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-sidebar">
          <div className="user-info">
            <h3>dd</h3>
            <p>dd</p>
          </div>

          <nav className="profile-nav">
            <div
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser /><span>My Profile</span>
            </div>
            <div
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FaShoppingBag /> <span>My Orders</span>
            </div>
            <div
              className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <FaHeart /> <span>Wishlist</span>
            </div>
            <div
              className={`nav-item ${activeTab === 'address' ? 'active' : ''}`}
              onClick={() => setActiveTab('address')}
            >
              <FaMapMarkerAlt /> <span>Addresses</span>
            </div>
            <div
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> <span>Settings</span>
            </div>
            <div className="nav-item logout">
              <FaSignOutAlt /> <span>Logout</span>
            </div>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>My Profile</h2>
              <div className="profile-details">
                <div className="detail-row">
                  <label>Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="detail-row">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className="detail-row">
                  <label>Phone</label>
                  <p>{user.phone || 'Not provided'}</p>
                </div>
                <div className="detail-row">
                  <label>Member Since</label>
                  <p>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
              <button className="edit-btn">Edit Profile</button>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="tab-content">
              <h2>My Orders</h2>
              {
                orders.length === 0
                  ? (
                    <p className="no-data">
                      No Orders Found
                    </p>
                  )
                  : (
                    <div className="orders-container">
                      {
                        orders.map((order) => (
                          <div
                            className="order-card"
                            key={order._id}
                          >
                            <div className="order-header">
                              <div>
                                <h4>
                                  Order ID:
                                  {order._id}
                                </h4>
                                <p>
                                  {
                                    new Date(
                                      order.createdAt
                                    ).toLocaleDateString()
                                  }
                                </p>
                              </div>
                              <div
                                className={`status ${order.status.toLowerCase()}`}
                              >
                                {order.status}
                              </div>
                            </div>
                            <div className="order-items">
                              {
                                order.orderItems.map((item) => (
                                  <div
                                    className="order-item"
                                    key={item._id}
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                    />
                                    <h4>
                                      {item.name}
                                    </h4>
                                    <p>{item.description}</p>
                                    <div
                                      className="item-info"
                                    >
                                      <p>
                                        Qty:
                                        {item.quantity}
                                      </p>
                                      <h3>
                                        ₹
                                        {item.price}
                                      </h3>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                            <div className="order-footer">
                              <h3>
                                Total:
                                ₹{order.totalPrice}
                              </h3>
                              <p>
                                Payment:
                                {order.paymentMethod}
                              </p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
              }
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="tab-content">
              <h2>My Wishlist</h2>
              <p className="no-data">No items in wishlist yet.</p>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="tab-content">
              <h2>Saved Addresses</h2>
              {addresses.map((addr, idx) => (

                <div className="address-card" key={idx}>

                  <div className="address-info">
                    <h4>{addr.fullName}</h4>
                    <p>{addr.address}</p>
                    <p>
                      {addr.city}, {addr.country} - {addr.postalCode}
                    </p>
                    <h5>{addr.phone}</h5>
                  </div>

                  <div className="address-actions">

                    <button
                      className="edit-btn-small"
                      onClick={() => {

                        setEditingAddress(addr);

                        setFormData({
                          fullName: addr.fullName,
                          phone: addr.phone,
                          address: addr.address,
                          city: addr.city,
                          postalCode: addr.postalCode,
                          country: addr.country,
                        });

                        setShowModal(true);

                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn-small"
                      onClick={() => deleteAddress(addr._id)}                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
              }
              <button
                className="add-address-btn"

                onClick={() => {

                  setEditingAddress(null);
                  setFormData({
                    fullName: "",
                    phone: "",
                    address: "",
                    city: "",
                    postalCode: "",
                    country: "",
                  });
                  setShowModal(true);
                }}
              >
                + Add New Address
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>Account Settings</h2>
              <button className="setting-btn">Change Password</button>
              <button className="setting-btn">Notification Preferences</button>
              <button className="setting-btn danger">Delete Account</button>
            </div>
          )}
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        editingAddress={editingAddress}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfilePage;