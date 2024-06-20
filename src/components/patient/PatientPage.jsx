import React from 'react'
import PatientNavbar from './patientNavbar/PatientNavbar'
import PatientSidebar from './patientSidebar/PatientSidebar'
import { Outlet } from 'react-router-dom';
import PatientRightContent from './patientRightContent/PatientRightContent';
import Prescription from './prescription/Prescription';

const PatientPage = () => {
  return (
    <div className='patient'>
      <PatientNavbar />
      <PatientSidebar />
      <Prescription />
      <PatientRightContent>
        <Outlet />
      </PatientRightContent>
    </div>
  )
}

export default PatientPage