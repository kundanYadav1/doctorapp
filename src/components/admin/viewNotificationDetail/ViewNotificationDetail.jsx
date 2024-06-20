import React, { useEffect, useState } from 'react'
import './ViewNotificationDetail.css';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

const ViewNotificationDetail = () => {
    const [notificationDetails, setNotificationDetails] = useState([]);
    const { id } = useParams("");
    const navigate = useNavigate();
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`http://localhost:3001/getdoctordetails`, {params: {id: id}, headers: { 'Authorization': `${token}`}});
            //console.log(details);
            setNotificationDetails(details.data);
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    const approveRequest = async () => {
        notificationDetails.approval = 2;
        notificationDetails.id = id;
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`http://localhost:3001/approveDoctor`, notificationDetails, { headers: { 'Authorization': `${token}`}});
            alert("approved");
            navigate('/admin/adminnotifications');
        } catch (error) {
            alert("error occured");
        }
    };

    const rejectRequest = async () => {
        notificationDetails.approval = 0;
        notificationDetails.id = id;
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`http://localhost:3001/approveDoctor`, notificationDetails, { headers: { 'Authorization': `${token}`}});
            alert("rejected");
            navigate('/admin/adminnotifications');
        } catch (error) {
            alert("error occured");
        }
    }

    return (
        <div className='notificationdetails'>
            <div className='notificationimage'><img className='notificationprofileimage' src={`http://localhost:3001/` + notificationDetails.profile_image} alt='notification'></img></div>
            <div className='notificationdata'>
                <div className='notificationdataleft'>
                    <div className='notificationlabel'>Name: <p className='notificationlabelp'>{notificationDetails.name}</p> </div>
                    <div className='notificationlabel'>Email: <p className='notificationlabelp'>{notificationDetails.email}</p></div>
                    <div className='notificationlabel'>Role: <p className='notificationlabelp'>{notificationDetails.role}</p></div>
                    <div className='notificationlabel'>Gender: <p className='notificationlabelp'>{notificationDetails.gender}</p></div>
                    <div className='notificationlabel'>DOB: <p className='notificationlabelp'>{notificationDetails.dob}</p></div>
                    <div className='notificationlabel'>Phone: <p className='notificationlabelp'>{notificationDetails.phone}</p></div>
                    <div className='notificationlabel'>Aadhar Number: <p className='notificationlabelp'>{notificationDetails.adhar_no}</p></div>
                    <button className='notificationprofileupdate1' onClick={approveRequest}><Link className='notificationprofileupdatelink1' to=''>Approve</Link></button>
                </div>
                <div className='notificationdataright'>
                    <div className='notificationlabel'>Father's Name: <p className='notificationlabelp'>{notificationDetails.father_name}</p></div>
                    <div className='notificationlabel'>Mother's Name: <p className='notificationlabelp'>{notificationDetails.mother_name}</p></div>
                    <div className='notificationlabel'>Marital Status: <p className='notificationlabelp'>{notificationDetails.marital_status}</p></div>
                    <div className='notificationlabel'>Qualification: <p className='notificationlabelp'>{notificationDetails.qualification}</p></div>
                    <div className='notificationlabel'>Specialization: <p className='notificationlabelp'>{notificationDetails.specialization}</p></div>
                    <div className='notificationlabel'>Work Experience: <p className='notificationlabelp'>{notificationDetails.work_experience + " years"}</p></div>
                    <div className='notificationlabel'>Fee/Consultation: <p className='notificationlabelp'>{notificationDetails.fee_per_consultation}</p></div>
                    <button className='notificationprofileupdate2' onClick={rejectRequest}><Link className='notificationprofileupdatelink2' to='/admin/adminnotifications'>Reject</Link></button>
                </div>
            </div>
        </div>
    )
}

export default ViewNotificationDetail