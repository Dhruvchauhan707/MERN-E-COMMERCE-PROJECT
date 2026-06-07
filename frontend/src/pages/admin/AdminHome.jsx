import React, { useState, useEffect } from 'react';
import '../../styles/admin/AdminHome.css';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminDashboard from '../../components/admin/AdminDashboard';
import ProductForm from '../../components/admin/ProductForm';
import ProductTable from '../../components/admin/ProductTable';
import OrderTable from '../../components/admin/OrderTable';
import UserTable from '../../components/admin/UserTable';
import CategoryTable from '../../components/admin/CategoryTable';
import { useProducts } from '../../Hooks/useProducts';
import { useOrders } from '../../Hooks/useOrders';
import { useUsers } from "../../Hooks/useUsers";
import { useCategories } from '../../Hooks/useCategories';
import axios from "axios";


const AdminHome = () => {

  console.log("AdminHome Render");
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  //ADMON DASHBOARD RELATED LOGIC
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
  });
  const fetchDashboardStats = async () => {

    try {

      const { data } = await axios.get(
        "https://mern-e-commerce-project-mlyd.onrender.com/api/dashboard/stats"
      );

      setDashboardStats(data);

    } catch (error) {

      console.log(error);

    }
  };
  useEffect(() => {
    fetchDashboardStats();
  }, []);



  // PRODUCT RELATED LOGIC
  const { products, loading, filterProducts, deleteProduct, createProduct, updateProduct } = useProducts();
  // stasts for product form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  // delete product function
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete Product?"
      )
    ) return;

    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Form submit handler (Add aur Edit dono ke liye)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("price", formData.price);
      productData.append("stock", formData.stock);
      productData.append("category", formData.category);
      productData.append("description", formData.description);
      productData.append("image", formData.image);

      if (isEditMode) {

        await updateProduct(editingProductId, productData);

      } else {

        await createProduct(productData);

      }
      setShowForm(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });

    } catch (error) {
      console.log(error);
    }
  };

  // 3. Edit Button Trigger
  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image
    });
    setIsEditMode(true);
    setEditingProductId(product._id);
    setViewingProduct(null); // Agar view page khula ho toh band ho jaye
    setShowForm(true);
  };


  // ORDER RELATED LOGIC
  const { orders, fetchAllOrders, deleteOrder, updateOrderStatus } = useOrders();
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);

  const activeOrders = orders.filter(
    (order) => order.status !== "Delivered"
  );

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  );

  // 2. Fetch Orders function
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // 3. Order delete karne ka function
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete Order?"))
      return;

    await deleteOrder(id);
  };
  // handel status change function
  const handleStatusChange = async (
    id,
    status
  ) => {
    await updateOrderStatus(
      id,
      status
    );
  };



  //USER RELATED LOGIC
  const { users, fetchUsers, changeRole, deleteUser, toggleBlock } = useUsers();

  const [showBlockedUsers, setShowBlockedUsers] = useState(false);
  const [showDeletedUsers, setShowDeletedUsers] = useState(false);

  const activeUsers = users.filter(
    (user) => !user.isBlocked && !user.isDeleted
  );

  const blockedUsers = users.filter(
    (user) => user.isBlocked && !user.isDeleted
  );

  const deletedUsers = users.filter(
    (user) => user.isDeleted
  );
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId,
    role
  ) => {
    await changeRole(
      userId,
      role
    );
  };

  // 3. User delete karne ka function
  const handleDeleteUser = async (
    userId
  ) => {

    if (
      !window.confirm(
        "Delete User?"
      )
    ) return;

    await deleteUser(userId);
  };
  const handleToggleBlock = async (
    userId,
    isBlocked
  ) => {

    await toggleBlock(
      userId,
      isBlocked
    );

  };


// CATEGORY RELATED LOGIC
const { 
    categories, 
    loading: categoryLoading, 
    createCategory, 
    deleteCategory 
} = useCategories();

  useEffect(() => {

    const fetchCategories = async () => {

      try {
        const { data } = await axios.get(
          "https://mern-e-commerce-project-mlyd.onrender.com/api/categories/"
        );
        setCategories(data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  //add category function  
  const handleAddCategory = async (formData) => {
    try {
      const { data } = await axios.post(
        "https://mern-e-commerce-project-mlyd.onrender.com/api/categories/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCategories((prev) => [
        ...prev,
        data,
      ]);

    } catch (error) {
      console.log(error);
    }

  };

  // delete category function
  const handleDeleteCategory = async (id) => {

    try {
      await axios.delete(
        `https://mern-e-commerce-project-mlyd.onrender.com/api/categories/${id}`,
        {
          withCredentials: true,
        }
      );

      setCategories(
        categories.filter(
          (cat) => cat._id !== id
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />

      <div className="admin-content-area">
        <header className="admin-navbar">
          <div className="nav-title-section">
            <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            <h3>{activeTab.toUpperCase()} Panel</h3>
          </div>
          <div className="nav-profile">
            <span>Welcome, <strong>Admin</strong></span>
          </div>
        </header>

        <main className="admin-main-content">
          {activeTab === 'dashboard' && <AdminDashboard dashboardStats={dashboardStats} totalProducts={products.length} />}

          {activeTab === 'products' && (
            <div className="products-view">

              {!showForm && !viewingProduct && (
                <div className="view-header">
                  <h2>Manage Products</h2>
                  <div className="products-actions-bar">
                    <input type="text" className="table-search-input" placeholder="🔍 Search product..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="add-btn" onClick={() => { setIsEditMode(false); setShowForm(true); }}>+ Add New Product</button>
                  </div>
                </div>
              )}

              {showForm && (
                <ProductForm
                  categories={categories}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleFormSubmit={handleFormSubmit}
                  setShowForm={setShowForm}
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  setFormData={setFormData}
                />
              )}

              {viewingProduct && (
                <div className="full-view-container">
                  <div className="view-page-header">
                    <button className="back-btn" onClick={() => setViewingProduct(null)}>← Back</button>
                    <h2>Product Detail View</h2>
                  </div>
                  <div className="view-page-body">
                    <div className="view-page-img">
                      <img src={viewingProduct.image} alt={viewingProduct.name} />
                    </div>
                    <div className="view-page-details">
                      <h1>{viewingProduct.name}</h1>
                      <p className="p-category">Category: <span>{viewingProduct.category}</span></p>
                      <h2 className="p-price">Price: ₹{Number(viewingProduct.price).toLocaleString('en-IN')}</h2>
                      <h3 className="p-stock">Available Stock: {viewingProduct.stock} Items</h3>
                      <div className="p-description">
                        <h4>Product Description:</h4>
                        <p>This is a full screen description page for {viewingProduct.name}. Here you can view deep insights, reviews, logs, and analytics related to this specific item in the future backend process.</p>
                      </div>
                      <button className="edit-inside-view-btn" onClick={() => handleEditClick(viewingProduct)}>✏️ Edit This Product</button>
                    </div>
                  </div>
                </div>
              )}

              {!showForm && !viewingProduct && (
                <ProductTable
                  products={products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                  handleDelete={handleDelete}
                  handleEditClick={handleEditClick} // Edit function pass kiya table ko
                  setViewingProduct={setViewingProduct} // View function pass kiya table ko
                />
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-view">
              <div className="view-header">
                <h2>
                  {showDeliveredOrders
                    ? "Delivered Orders"
                    : "Customer Orders"}
                </h2>

                <button
                  className="delivered-btn"
                  onClick={() =>
                    setShowDeliveredOrders(
                      !showDeliveredOrders
                    )
                  }
                >
                  {showDeliveredOrders
                    ? "← Back to Active Orders"
                    : "📦 Delivered Orders"}
                </button>
              </div>

              <OrderTable
                orders={
                  showDeliveredOrders
                    ? deliveredOrders
                    : activeOrders
                }
                handleStatusChange={handleStatusChange}
                handleDeleteOrder={handleDeleteOrder}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-view">
              <div className="view-header">
                <h2>
                  {showBlockedUsers
                    ? "Blocked Users"
                    : showDeletedUsers
                      ? "Deleted Users"
                      : "Registered Users"}
                </h2>

                <div className="user-filter-buttons">
                  <button
                    className="filter-btn"
                    onClick={() => {
                      setShowBlockedUsers(false);
                      setShowDeletedUsers(false);
                    }}
                  >
                    👥 Active Users
                  </button>

                  <button
                    className="filter-btn"
                    onClick={() => {
                      setShowBlockedUsers(true);
                      setShowDeletedUsers(false);
                    }}
                  >
                    🚫 Blocked Users
                  </button>

                  <button
                    className="filter-btn"
                    onClick={() => {
                      setShowDeletedUsers(true);
                      setShowBlockedUsers(false);
                    }}
                  >
                    🗑️ Deleted Users
                  </button>
                </div>
              </div>

              <UserTable
                users={
                  showDeletedUsers
                    ? deletedUsers
                    : showBlockedUsers
                      ? blockedUsers
                      : activeUsers
                }
                handleRoleChange={handleRoleChange}
                handleDeleteUser={handleDeleteUser}
                handleToggleBlock={handleToggleBlock} // Naya prop pass kiya
              />
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="categories-view">
              <div className="view-header">
                <h2>Category Management</h2>
              </div>
              {categoryLoading && <p>Loading categories...</p>}
              <CategoryTable
                categories={categories}
                handleAddCategory={createCategory}        // Important
                handleDeleteCategory={deleteCategory}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminHome;