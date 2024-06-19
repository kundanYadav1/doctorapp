const mongoose = require('mongoose');




const bookingSchema = new mongoose.Schema({
    doctor_id: {
        type: String
    },
    patient_id: {
        type: String
    },
    bookingDate: {
        type: Date
    },
    bookingTime: {
        type: String
    }

});

const bookings = new mongoose.model("bookings",bookingSchema);
module.exports = bookings;