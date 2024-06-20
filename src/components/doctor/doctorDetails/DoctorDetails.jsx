import React, { useEffect, useState } from 'react'
import './DoctorDetails.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const DoctorDetails = () => {
    const [doctorDetails, setDoctorDetails] = useState([]);
    //const id = localStorage.getItem("userid");
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`http://localhost:3001/getuserdetails`,{headers: {'Authorization': `${token}`}});
            console.log("hello")
            console.log(details.data.userData);
            // console.log(id);
            setDoctorDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div className='doctordetails'>
            <div className='doctorimage'><img className='doctorprofileimage' src={`http://localhost:3001/`+doctorDetails.profile_image} alt='doctor'></img></div>
            <div className='doctordata'>
                <div className='doctordataleft'>
                    <div className='doctorlabel'>Name: <p className='doctorlabelp'>{doctorDetails.name}</p> </div>
                    <div className='doctorlabel'>Email: <p className='doctorlabelp'>{doctorDetails.email}</p></div>
                    <div className='doctorlabel'>Role: <p className='doctorlabelp'>{doctorDetails.role}</p></div>
                    <div className='doctorlabel'>Gender: <p className='doctorlabelp'>{doctorDetails.gender}</p></div>
                    <div className='doctorlabel'>DOB: <p className='doctorlabelp'>{doctorDetails.dob}</p></div>
                    <div className='doctorlabel'>Phone: <p className='doctorlabelp'>{doctorDetails.phone}</p></div>
                    <div className='doctorlabel'>Aadhar Number: <p className='doctorlabelp'>{doctorDetails.adhar_no}</p></div>
                    <button className='doctorprofileupdate'><Link className='doctorprofileupdatelink' to='/doctor/doctordetails/editdoctordetails'>Update Profile</Link></button>
                </div>
                <div className='doctordataright'>
                    <div className='doctorlabel'>Father's Name: <p className='doctorlabelp'>{doctorDetails.father_name}</p></div>
                    <div className='doctorlabel'>Mother's Name: <p className='doctorlabelp'>{doctorDetails.mother_name}</p></div>
                    <div className='doctorlabel'>Marital Status: <p className='doctorlabelp'>{doctorDetails.marital_status}</p></div>
                    <div className='doctorlabel'>Qualification: <p className='doctorlabelp'>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.qualification}</p></div>
                    <div className='doctorlabel'>Specialization: <p className='doctorlabelp'>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.specialization}</p></div>
                    <div className='doctorlabel'>Work Experience: <p className='doctorlabelp'>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.work_experience+" years"}</p></div>
                    <div className='doctorlabel'>Fee/Consultation: <p className='doctorlabelp'>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.fee_per_consultation}</p></div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails