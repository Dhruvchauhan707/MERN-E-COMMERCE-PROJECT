import { useState, useEffect } from "react";
import { orderApi } from "../api/orderApi";

export const useOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);


  //fetch order
  const fetchOrders = async () => {

    try {

      const data =
        await orderApi.getMyOrders();

      setOrders(data);
    } catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);

      const data =
        await orderApi.getAllOrders();

      setOrders(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await orderApi.deleteOrder(id);
      await fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (id,status) => {
    try {
      await orderApi.updateOrderStatus(
        id,
        status
      );

      await fetchAllOrders();

    } catch (error) {
      console.log(error);
    }
  };



  return {
    orders,
    fetchOrders,
    fetchAllOrders,
    deleteOrder,
    updateOrderStatus,
  };

};