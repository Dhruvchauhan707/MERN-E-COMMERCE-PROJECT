// src/hooks/useCheckout.js

import { orderApi } from "../Api/orderApi";

export const useCheckout = () => {

  //place order
  const placeOrder = async (orderData) => {
      try {

        const data =await orderApi.createOrder(
            orderData
          );
        return data;
      } catch (error) {
        throw error;
      }
    };

  return {
    placeOrder,
  };
};