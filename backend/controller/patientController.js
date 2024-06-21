const userModel = require('../models/users')
const Bookings = require('../models/booking')
const DoctorAvailability = require('../models/doctorAvalability');

const mongoose = require('mongoose');


getApprovedDoctors = async(req,res)=>{
    try {
        const doctorData = await userModel.find({approval:2});
        res.status(200).json(doctorData);
    } catch (error) {
        res.status(500).json({status:500});
    }
}



getDoctorAvailablity = async(req,res)=>{
    const id = req.query.id
    try {
        const data = await DoctorAvailability.findOne({doctor_id:id});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({status:500});
    }
}




getAlreadyBookedslots = async (req,res) =>{
    const id= req.query.id;
    try {
        console.log(id)
        const now = new Date();
        now.setHours(0, 0, 0, 0)
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
        console.log(next7Days)
        const data = await Bookings.find({doctor_id:id,bookingDate: {
            $gte: now,
            $lt: next7Days
          }});
        res.status(200).json({data:data});
    } catch (error) {
        res.status(500).json({status:500});
    }
}

const submitBookings = async (req, res) => {
  try {
    if (req.data.user.role === "patient") {
      const id = req.data.user.id;
      req.body.patient_id = id;
      const dateObject = new Date(req.body.bookingDate);
      req.body.bookingDate = dateObject;

      const data = new Bookings(req.body);
      const savedData = await data.save();
      return res.status(200).json(savedData);
    } else {
      console.error('Unauthorized access attempt');
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
  } catch (error) {
    console.error('Error occurred while submitting booking:', error.message);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

getAllBookings = async (req,res)=>{
    try{
    const id = req.data.user.id
    console.log(id)
    const details = await  Bookings.aggregate([
        {
          $match: {
            patient_id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $group: {
            _id: "$doctor_id",
            appointments: { $push: "$$ROOT" }
          }
        },
        {
            $lookup: {
              from: 'users', 
              localField: '_id',
              foreignField: '_id',
              as: 'doctorDetails'
            }
          },
          {
            $unwind: "$doctorDetails" 
          }
      ]);
    res.status(200).json(details)
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:500});
    }

}




module.exports ={
    getApprovedDoctors,
    getDoctorAvailablity,
    getAlreadyBookedslots,
    submitBookings,
    getAllBookings

}