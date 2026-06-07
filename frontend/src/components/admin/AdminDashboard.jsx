import React from "react";
import "../../styles/admin/AdminDashboard.css";

const AdminDashboard = ({ dashboardStats, totalProducts }) => {

  const monthlySales = dashboardStats?.monthlySales || [];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const maxSales = Math.max(
    ...monthlySales.map(
      item => item.totalSales
    ),
    1
  );

  const recentOrders = dashboardStats?.recentOrders || [];
  const lowStockProducts = dashboardStats?.lowStockProducts || [];

  return (
    <div className="dashboard-view">
     <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Sales</h4>
          <p>₹{dashboardStats.totalSales.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>{dashboardStats.totalOrders}</p>
        </div>

        <div className="stat-card">
          <h4>Total Products</h4>
          <p>{dashboardStats.totalProducts}</p>
        </div>

        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{dashboardStats.totalUsers}</p>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-box chart-box">
          <h3>Monthly Sales</h3>

          {monthlySales.map((item) => (

            <div
              key={item._id.month}
              className="chart-item"
            >
              <span>
                {
                  months[item._id.month - 1]
                }
              </span>
              <div
                className="bar"
                style={{width: `${(item.totalSales /maxSales) * 100}%`}}>
              </div>
              <strong>
                ₹{item.totalSales}
              </strong>
            </div>
          ))}
        </div>

        <div className="dashboard-box">
          <h3>Recent Orders</h3>

          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user?.name}</td>

                  <td>
                    ₹{order.totalPrice}
                  </td>

                  <td>
                    <span
                      className={`order-status ${order.status}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="dashboard-box low-stock-box">
        <h3>Low Stock Alert</h3>

        {lowStockProducts.length === 0 ? (
          <p>All products are well stocked </p>
        ) : (
          lowStockProducts.map((product) => (
            <div
              key={product._id}
              className="low-stock-item"
            >
              <div>
                <strong>
                  {product.name}
                </strong>
              </div>

              <span
                className="stock-warning"
              >
                {product.stock} Left
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;