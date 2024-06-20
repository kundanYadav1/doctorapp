import React from 'react'
import './PatientSidebar.css'
import { Link } from 'react-router-dom'

const PatientSidebar = () => {
  return (
    <div className='patientsidebar'>
      <div className='patienticon'><Link to="/patient/getapproveddoctors">Dashboard</Link></div>
      <div className='patienticon'><Link to="/patient/patientdetails">My Profile</Link></div>
    </div>
  )
}

export default PatientSidebar