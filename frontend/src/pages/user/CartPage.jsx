// src/components/user/CartPage.jsx
import React from 'react';
import '../../styles/user/cart.css';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../../Hooks/useCart';
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader'

const CartPage = () => {
  const {
    cartItems,
    coupon,
    setCoupon,
    discount,
    updateQuantity,
    removeItem,
    applyCoupon,
    subtotal,
    shipping,
    total,
    cartLoading
  } = useCart();

  const handleRemove = async (itemId) => {

    const confirmDelete = window.confirm(
      "Remove this item from cart?"
    );

    if (!confirmDelete) return;

    await removeItem(itemId); 
  };

  if (cartLoading) return <Loader/>;

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button className="shop-now-btn"><Link to='/shop'>Continue Shopping</Link></button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product._id}>
                <img src={item.product.image} alt={item.product.name} />
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <p className="size">Size: {item.product.size}</p>
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        updateQuantity(item._id, item.quantity - 1)
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        updateQuantity(item._id, item.quantity + 1)
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <p>₹{item.product.price * item.quantity}</p>
                  <button
                    onClick={() => handleRemove(item._id)}
                  >
                    remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>

            <button className="checkout-btn">
              <Link to="/checkout">Proceed to Checkout <FaArrowRight /></Link>
            </button>
            <p className="secure-text">🔒 Secure Checkout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;