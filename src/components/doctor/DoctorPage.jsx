import React from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom';
import RightContent from './rightContent/RightContent';
import WritePrescription from './writePrescription/WritePrescription';
import BookingNotifications from './bookingNotifications/BookingNotifications';

const DoctorPage = () => {
  return (
    <div className='doctor'>
      <Navbar />
      <Sidebar />
      <WritePrescription />
      <BookingNotifications />
      <RightContent>
        <Outlet />
      </RightContent>
    </div>
  )
}

export default DoctorPage