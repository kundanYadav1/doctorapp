import React, { useState} from 'react';
import './WritePrescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const WritePrescription = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  const [prescriptionData, setPrescriptionData] = useState({
    name: "",
    qunatity: "",
    morning: "",
    afternoon: "",
    evening: ""
  });

  const submitData = async (e) => {
    const token = localStorage.getItem('authToken');
    axios.post("http://localhost:3001/addDetailsToPatient", {bookingId:id, prescription:prescriptionData}, {headers: {'Authorization': `${token}`}})
      .then((response) => {
        alert('success')
        navigate('/doctor/bookingnotifications');
      })
      .catch((error) => {
        alert('Error registering:', error);
      });
  };

  const onChange = (event) => {
    setPrescriptionData({ ...prescriptionData, [event.target.name]: event.target.value });
  };

  return (
    <div className='register'>
      <div className='register-right'>
        <div>
          <h3>Write Prescription</h3>
          <label className='register-label name-label'>Name:</label>
          <input className='register-input name-input' type="text" name="name" value={prescriptionData.name} onChange={onChange} placeholder="Enter your full name" required />
          
          <label className='register-label quantity-label'>Quantity:</label>
          <input className='register-input quantity-input' type="number" name="qunatity" value={prescriptionData.qunatity} onChange={onChange} placeholder="Enter quantity" required />
          
          <label className='register-label morning-label'>Morning:</label>
          <input className='register-input morning-input' type="time" name="morning" value={prescriptionData.morning} onChange={onChange} required />
          
          <label className='register-label afternoon-label'>Afternoon:</label>
          <input className='register-input afternoon-input' type="time" name="afternoon" value={prescriptionData.afternoon} onChange={onChange} required />
          
          <label className='register-label evening-label'>Evening:</label>
          <input className='register-input evening-input' type="time" name="evening" value={prescriptionData.evening} onChange={onChange} required />
          
          <div className="register-wrap">
            <button className='register-button' type="submit" onClick={submitData}> Submit </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePrescription;
