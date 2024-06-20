import React, { useEffect, useState } from 'react'
import './PatientDetails.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const PatientDetails = () => {
    const [patientDetails, setPatientDetails] = useState([]);
    const id = localStorage.getItem("userid");
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`http://localhost:3001/getuserdetails`, { headers: { 'Authorization': `${token}` } });
            // console.log(details.data.userData);
            // console.log(id);
            setPatientDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div className='patientdetails'>
            <div className='patientimage'><img className='patientprofileimage' src={`http://localhost:3001/` + patientDetails.profile_image} alt='patient'></img></div>
            <div className='patientdata'>
                <div className='patientdataleft'>
                    <div className='patientlabel'>Name: <p className='patientlabelp'>{patientDetails.name}</p> </div>
                    <div className='patientlabel'>Email: <p className='patientlabelp'>{patientDetails.email}</p></div>
                    <div className='patientlabel'>Role: <p className='patientlabelp'>{patientDetails.role}</p></div>
                    <div className='patientlabel'>Gender: <p className='patientlabelp'>{patientDetails.gender}</p></div>
                    <div className='patientlabel'>DOB: <p className='patientlabelp'>{patientDetails.dob}</p></div>
                    <button className='patientprofileupdate'><Link className='patientprofileupdatelink' to='/patient/patientdetails/editpatientdetails'>Update Profile</Link></button>
                </div>
                <div className='patientdataright'>
                    <div className='patientlabel'>Phone: <p className='patientlabelp'>{patientDetails.phone}</p></div>
                    <div className='patientlabel'>Aadhar Number: <p className='patientlabelp'>{patientDetails.adhar_no}</p></div>
                    <div className='patientlabel'>Father's Name: <p className='patientlabelp'>{patientDetails.father_name}</p></div>
                    <div className='patientlabel'>Mother's Name: <p className='patientlabelp'>{patientDetails.mother_name}</p></div>
                    <div className='patientlabel'>Marital Status: <p className='patientlabelp'>{patientDetails.marital_status}</p></div>
                </div>
            </div>
        </div>
    )
}

export default PatientDetails