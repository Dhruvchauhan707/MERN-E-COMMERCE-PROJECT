import React from 'react'
import { Outlet } from 'react-router-dom';
import { useProducts } from '../Hooks/useProducts';
import Loader from '../components/common/Loader';

function AdminLayout() {

  const { loading } = useProducts();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AdminLayout