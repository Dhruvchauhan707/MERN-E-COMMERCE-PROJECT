import React, { useState, useEffect } from 'react';
import '../../styles/user/CheckoutPage.css';
import { useAddress } from "../../hooks/useAddress";
import { useCheckout } from "../../hooks/useCheckout";
import { useCart } from "../../hooks/useCart";
import AddressModal from '../../components/user/AddressModal';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaQrcode, FaMoneyBillWave, FaTruck } from 'react-icons/fa';

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [addresse, setAddresse] = useState([]);
  const { addresses, loading, createAddress } = useAddress();
  const { placeOrder } = useCheckout();
  const { cartItems } = useCart();

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses]);


  const handlePlaceOrder = async () => {
    try {
      const selectedAddressData =
        addresses.find(
          (addr) => addr._id === selectedAddress
        );

      const orderData = {

        orderItems:

          cartItems.map((item) => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          })),

        shippingAddress: {
          address: selectedAddressData.address,
          city: "Surat",
          postalCode: "395003",
          country: "India",
        },
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const data = await placeOrder(orderData);
      alert(
        "🎉 Order Placed Successfully!"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleAddressSubmit = async () => {

    await createAddress(formData);

    setShowModal(false);

    setFormData({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
  };



  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      item.product.price *
      item.quantity,
    0
  );

  const shipping = deliveryOption === "express" ? 99 : 0;
  const total = subtotal + shipping;



  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-btn">
          <Link to="/cart"><span><FaArrowLeft /></span></Link>
        </button>        
        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">
        <div className="checkout-left">
          <section className="checkout-section">
            <h2>Shipping Address</h2>
            {addresses.map((addr, index) => (
              <div
                key={index}
                className={`address-card ${selectedAddress === addr._id ? 'selected' : ''}`}
                onClick={() => setSelectedAddress(addr._id)}
              >
                <input type="radio" checked={selectedAddress === addr._id} readOnly />
                <div>
                  <h4>{addr.fullName}</h4>
                  <p>{addr.address}, {addr.city}, {addr.country} - {addr.postalCode}</p>
                  <h5>CONTACT NO: {addr.phone}</h5>

                </div>
              </div>
            ))}
            <button
              className="add-new-btn"
              onClick={() => setShowModal(true)}
            >
              + Add New Address
            </button>          </section>

          {/* Delivery Option */}
          <section className="checkout-section">
            <h2>Delivery Option</h2>
            <div className="delivery-options">
              <div className={`delivery-card ${deliveryOption === 'standard' ? 'selected' : ''}`} onClick={() => setDeliveryOption('standard')}>
                <FaTruck /><div><strong>Standard Delivery</strong><p>2-5 Days • Free</p></div>
              </div>
              <div className={`delivery-card ${deliveryOption === 'express' ? 'selected' : ''}`} onClick={() => setDeliveryOption('express')}>
                <FaTruck /><div><strong>Express Delivery</strong><p>1-2 Days • ₹99</p></div>
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <div className={`payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cod')}>
                <FaMoneyBillWave /><span>Cash on Delivery</span>
              </div>
              <div className={`payment-card ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                <FaQrcode /><span>UPI / Wallet</span>
              </div>
              <div className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                <FaCreditCard /><span>Credit / Debit Card</span>
              </div>
            </div>
          </section>
        </div>

        <div className="checkout-right">
          <div className="order-summary">
            <h3>Order Summary</h3>

            {cartItems.map(item => (
              <div
                className="summary-item"
                key={item._id}
              >
                <span>
                  {item.product.name}×{item.quantity}
                </span>
                <span>
                  ₹{
                    item.product.price *
                    item.quantity
                  }
                </span>
              </div>
            ))}

            <div className="summary-total">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-total">
              <span>Shipping</span>
              <span>
                {
                  shipping === 0 ? "Free" : `₹${shipping}`
                }
              </span>
            </div>

            <div className="final-total">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order - ₹{total}
            </button>

            <p className="secure-note">🔒 Secure & Encrypted Checkout</p>
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        editingAddress={null}
        handleSubmit={handleAddressSubmit}
      />
    </div>
  );
};

export default CheckoutPage;