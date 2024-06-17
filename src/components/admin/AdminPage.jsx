import React from 'react'
// import { Outlet } from 'react-router-dom';
import AdminNavbar from './adminNavbar/AdminNavbar';
import AddNews from './addNews/AddNews';
// import AdminSidebar from './adminSidebar/AdminSidebar';
// import AdminRightContent from './adminRightContent/AdminRightContent';

const AdminPage = () => {
  return (
    <div className='admin'>
      <AdminNavbar />
      <AddNews />
      {/* <AdminSidebar />
      <AdminRightContent>
        <Outlet />
      </AdminRightContent> */}
    </div>
  )
}

export default AdminPage