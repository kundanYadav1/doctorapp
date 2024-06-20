import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from './adminNavbar/AdminNavbar';
import AdminSidebar from './adminSidebar/AdminSidebar';
import AdminRightContent from './adminRightContent/AdminRightContent';
import DynamicGraph from './dynamicGraph/DynamicGraph';

const AdminPage = () => {
  return (
    <div className='admin'>
      <AdminNavbar />
      <AdminSidebar />
      <DynamicGraph />
      <AdminRightContent>
        <Outlet />
      </AdminRightContent>
    </div>
  )
}

export default AdminPage