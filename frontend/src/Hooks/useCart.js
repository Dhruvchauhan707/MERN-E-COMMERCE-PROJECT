// src/hooks/useCart.js
import { useState, useEffect } from 'react';
import { cartApi } from '../api/cartApi';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setcartLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      setcartLoading(true);
      const data = await cartApi.getCartItems();

      setCartItems(data?.cartItems ?? data ?? []);
    } catch (err) {
      setError("Failed to load cart items");

      console.error(err);
    } finally {
      setcartLoading(false);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Update quantity
const updateQuantity = async (id, newQty) => {

  try {
    await cartApi.updateQuantity(id, newQty);
    await fetchCartItems();
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (productId) => {

  try {
    await cartApi.addToCart(
      productId,
    );
  } catch (error) {
    console.log(error);
  }
};
  // Remove item
 const removeItem = async (itemId)=>{
  try {
    setcartLoading(true)
    const response = await cartApi.removeItem(
      itemId,
    );
    
    await fetchCartItems();

  } catch (error) {
    console.log(error);
  }finally{
    setcartLoading(false)
  }
 }

 // Apply coupon
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(300);
      alert("✅ Coupon Applied Successfully!");
    } else {
      alert("❌ Invalid Coupon Code");
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping - discount;

  return {
    cartItems,
    error,
    coupon,
    setCoupon,
    discount,
    updateQuantity,
    removeItem,
    applyCoupon,
    subtotal,
    shipping,
    total,
    refetch: fetchCartItems,
    addToCart,
    cartLoading
  };  

}

  
