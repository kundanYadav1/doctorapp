import React, { useState, useEffect } from 'react';
import './Prescription.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const Prescription = () => {
    const [prescriptionData, setPrescriptionData] = useState(null);

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`http://localhost:3001/getAllBookings`, {
                headers: { 'Authorization': `${token}` }
            });
            console.log(response.data);
            setPrescriptionData(response.data);
        } catch (error) {
            alert('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!prescriptionData) {
        return <div>Loading...</div>;
    }

    const downloadPDF = () => {
        const doc = new jsPDF();
        const doctorName = `Doctor Name: ${prescriptionData[0].doctorDetails.name}`;

        let yPosition = 10; 
        doc.text(doctorName, 10, yPosition);
        yPosition += 10; 

        prescriptionData[0].appointments.forEach((appointment, index) => {
            yPosition += 10; 
            doc.text(`Appointment ${index + 1}`, 10, yPosition);
            yPosition += 10;

            appointment.prescription.forEach((prescription, idx) => {
                yPosition += 10; 
                doc.text(`Medicine Name: ${prescription.name}`, 20, yPosition);
                yPosition += 10; 
                doc.text(`Quantity: ${prescription.qunatity}`, 20, yPosition);
                yPosition += 10; 
                doc.text(`Morning: ${prescription.morning}`, 20, yPosition);
                yPosition += 10; 
                doc.text(`Afternoon: ${prescription.afternoon}`, 20, yPosition);
                yPosition += 10; 
                doc.text(`Evening: ${prescription.evening}`, 20, yPosition);
                yPosition += 10; 
            });
        });

        doc.save('prescriptionPDF.pdf');
    };


    return (
        <div className='view-prescription'>
            <div className='doctor-name'>
                <p><strong>Doctor Name:</strong> {prescriptionData[0].doctorDetails.name}</p>
            </div>
            <div className='view-prescription-right'>
                <h3 className='appointmenth3'>Prescription Details</h3>
                {prescriptionData[0].appointments.map((appointment, index) => (
                    <div key={appointment._id} className='appointment-details'>
                        <h4 className='appointmenth4'>Appointment {index + 1}</h4>
                        {appointment.prescription.map((prescription, idx) => (
                            <div key={idx} className='prescription-details'>
                                <p><strong>Medicine Name:</strong> {prescription.name}</p>
                                <p><strong>Quantity:</strong> {prescription.qunatity}</p>
                                <p><strong>Morning:</strong> {prescription.morning}</p>
                                <p><strong>Afternoon:</strong> {prescription.afternoon}</p>
                                <p><strong>Evening:</strong> {prescription.evening}</p>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={downloadPDF}>Download PDF</button>
            </div>
        </div>
    );
};

export default Prescription;
