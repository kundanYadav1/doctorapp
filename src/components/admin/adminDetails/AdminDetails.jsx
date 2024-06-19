import React, { useEffect, useState } from 'react'
import './AdminDetails.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const AdminDetails = () => {
    const [adminDetails, setAdminDetails] = useState([]);
    //const id = localStorage.getItem("userid");
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`http://localhost:3001/getuserdetails`,{headers: {'Authorization': `${token}`}});
            //console.log(details.data.userData);
            console.log(details);
            setAdminDetails(details.data.userData);
            //console.log(adminDetails)
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div className='admindetails'>
            <div className='adminimage'><img className='adminprofileimage' src={`http://localhost:3001/` + adminDetails.profile_image} alt='admin'></img></div>
            <div className='admindata'>
                <div className='admindataleft'>
                    <div className='adminlabel'>Name: <p className='adminlabelp'>{adminDetails.name}</p> </div>
                    <div className='adminlabel'>Email: <p className='adminlabelp'>{adminDetails.email}</p></div>
                    <div className='adminlabel'>Role: <p className='adminlabelp'>{adminDetails.role}</p></div>
                    <div className='adminlabel'>Gender: <p className='adminlabelp'>{adminDetails.gender}</p></div>
                    <div className='adminlabel'>DOB: <p className='adminlabelp'>{adminDetails.dob}</p></div>
                    <button className='adminprofileupdate'><Link className='adminprofileupdatelink' to='/admin/admindetails/editadmindetails'>Update Profile</Link></button>
                </div>
                <div className='admindataright'>
                    <div className='adminlabel'>Phone: <p className='adminlabelp'>{adminDetails.phone}</p></div>
                    <div className='adminlabel'>Aadhar Number: <p className='adminlabelp'>{adminDetails.adhar_no}</p></div>
                    <div className='adminlabel'>Father's Name: <p className='adminlabelp'>{adminDetails.father_name}</p></div>
                    <div className='adminlabel'>Mother's Name: <p className='adminlabelp'>{adminDetails.mother_name}</p></div>
                    <div className='adminlabel'>Marital Status: <p className='adminlabelp'>{adminDetails.marital_status}</p></div>
                </div>
            </div>
        </div>
    )
}

export default AdminDetails