import { useEffect, useState } from "react";
import { addressApi } from "../Api/addressApi";

export const useAddress = () => {

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user addresses
  const fetchAddresses = async () => {
    try {
      const data = await addressApi.getAddresses();
      setAddresses(data);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong")
      } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Create, Update, Delete address functions
  const createAddress = async (addressData) => {
    await addressApi.createAddress(addressData);
    fetchAddresses();
  };
  const updateAddress = async (id, addressData) => {
    await addressApi.updateAddress(id, addressData);
    fetchAddresses();
  };
  const deleteAddress = async (id) => {
    await addressApi.deleteAddress(id);
    fetchAddresses();
  };


  return {
    addresses,
    loading,
    createAddress,
    updateAddress,
    deleteAddress,
    refetch: fetchAddresses,
  };

};