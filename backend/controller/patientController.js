const userModel = require('../models/users')
const Bookings = require('../models/booking')
const DoctorAvailability = require('../models/doctorAvalability')




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
        console.log(now)
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


submitBookings = async (req,res)=>{
    if(req.data.user.role == "patient"){
    const id = req.data.user.id
    req.body.patient_id = id
    const dateObject = new Date(req.body.bookingDate);
    req.body.bookingDate=dateObject
    try {
        const data = new Bookings(req.body);
        const savedData = await data.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({status:500});
    }
}
else{
    res.status(400).json({status:401})
}
}






module.exports ={
    getApprovedDoctors,
    getDoctorAvailablity,
    getAlreadyBookedslots,
    submitBookings

}