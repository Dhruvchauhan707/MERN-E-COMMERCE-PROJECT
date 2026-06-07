import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/user/Navbar';

function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default UserLayout;