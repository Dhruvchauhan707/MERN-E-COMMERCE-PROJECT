import React, { useState } from 'react';
import '../../styles/admin/ProductTable.css';
import '../../styles/admin/OrderTable.css'; // New CSS for OrderTable

const OrderTable = ({ orders, handleDeleteOrder ,handleStatusChange}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [printData, setPrintData] = useState(null);

  // Print function jo window print trigger karega
  const handlePrint = (order) => {
    setPrintData(order);
    // Thoda sa timeout taaki React DOM me print-section render ho jaye, fir print open ho
    setTimeout(() => {
      window.print();
    }, 100);
  };

 

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td><span className="order-id-badge">#{order._id.slice(-6)}</span></td>
              <td>
                <div className="customer-info-cell">
                  <strong>{order.user?.name}</strong>
                  <span className="customer-email">{order.user?.email}</span>
                </div>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td><strong>₹{order.totalPrice}</strong></td>
              <td>
                <select
                  className={`status-select ${order.status}`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">⏳ Pending</option>
                  <option value="Processing">⚙️ Processing</option>
                  <option value="Shipped">🚚 Shipped</option>
                  <option value="Delivered">✅ Delivered</option>
                  <option value="Cancelled">❌ Cancelled</option>
                </select>
              </td>
              <td>
                <button className="action-btn view" onClick={() => setSelectedOrder(order)} title="View Order Details">
                  👁️
                </button>
                {/* 🖨️ NEW PRINT BUTTON */}
                <button className="action-btn print" onClick={() => handlePrint(order)} title="Print Invoice">
                  🖨️
                </button>
                <button className="action-btn delete" onClick={() => handleDeleteOrder(order._id)} title="Delete Log">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🚨 DEDICATED INVOICE PRINT SECTION (Normal screen par hidden rahega, sirf print par dikhega) */}
      {printData && (
        <div className="invoice-print-area">
          <div className="invoice-header">
            <div>
              <h1>E-SHOP INVOICE</h1>
              <p>Order ID: <strong>#{printData._id}</strong></p>
              <p>Date: {printData.date}</p>
            </div>
            <div className="invoice-store-details">
              <h3>Nextera Lab Store</h3>
              <p>Ahmedabad, Gujarat, India</p>
              <p>support@nexteralab.com</p>
            </div>
          </div>
          <hr />

          <div className="invoice-bill-to">
            <h4>BILL TO:</h4>
            <h3>{selectedOrder.user?.name}</h3>
            <p><strong>Email:</strong> {printData.email}</p>
            <p><strong>Phone:</strong> {printData.phone || '+91 9876543210'}</p>
            <p><strong>Address:</strong> {printData.address || '102, Royal Roots Apartment, Ahmedabad, Gujarat - 380009'}</p>
          </div>

          <table className="invoice-items-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {printData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{Number(item.price).toLocaleString('en-IN')}</td>
                  <td>{item.qty}</td>
                  <td>₹{Number(item.price * item.qty).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-footer">
            <div className="invoice-total">
              <span>Grand Total:</span>
              <h2>₹{Number(printData.totalAmount).toLocaleString('en-IN')}</h2>
            </div>
            <p className="thank-you-msg">Thank you for shopping with us!</p>
          </div>
        </div>
      )}

      {/* MODAL VIEW CODE (Pehle jaisa hi hai) */}
      {selectedOrder && (

        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details (#{selectedOrder._id})</h3>
              <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>×</button>
            </div>
            <div className="modal-body order-modal-body">
              <div className="order-details-section">
                <div className="detail-block">
                  <h4>👤 Customer Info</h4>
                  <p><strong>Name:</strong> {selectedOrder.user?.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
                </div>
                <div className="detail-block">
                  <h4>📍 Shipping Address</h4>
                  <p className="address-text">{`${selectedOrder.shippingAddress.address},
                                   ${selectedOrder.shippingAddress.city},
                                   ${selectedOrder.shippingAddress.postalCode},
                                   ${selectedOrder.shippingAddress.country}`}</p>
                </div>
              </div>
              <div className="order-items-section">
                <h4>🛒 Ordered Items</h4>
                <div className="ordered-items-list">
                  {selectedOrder.orderItems?.map((item, index) => (
                    <div key={index} className="ordered-item-card">
                      <span>{item.name} <strong>x{item.quantity}</strong></span>
                      <span>₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <hr className="order-divider" />
                <div className="order-total-bill">
                  <span>Grand Total:</span>
                  <strong> ₹{Number(selectedOrder.itemsPrice).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;