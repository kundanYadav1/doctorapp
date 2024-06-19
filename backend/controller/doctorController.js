
const DoctorAvailability = require("../models/doctorAvalability");





submitDoctorAvailability = async ( req,res)=>{
    const doctorId=req.data.user.id
    const data = new DoctorAvailability({
        doctor_id: doctorId,
        time_slot: req.body.time_slot,
        morning: {
            from: req.body.morning.from,
            to: req.body.morning.to
        },
        afternoon: {
            from: req.body.afternoon.from,
            to: req.body.afternoon.to
        },
        evening: {
            from: req.body.evening.from,
            to: req.body.evening.to
        }
    });
    try {
        const findFirst = await DoctorAvailability.findOne({ doctor_id: doctorId });
        if (!findFirst) {
            const savedData = await data.save();
            res.status(200).json({ data: savedData });
        }
        else {
            const savedData = await DoctorAvailability.findOneAndUpdate({doctor_id: doctorId}, { ...req.body }, { new: true });
            res.status(200).json({ data: savedData });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500 });
    }
}


module.exports={
    submitDoctorAvailability,
}
// {

//     time_slot: '15',
//         morning: { from: '06:23', to: '11:23' },
//     afternoon: { from: '12:24', to: '16:24' },
//     evening: { from: '18:24', to: '22:25' }
// }