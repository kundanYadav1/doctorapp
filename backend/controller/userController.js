const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const otpModel = require('../models/otp');
require('dotenv').config();


const jwtSecretKey = process.env.JWT_SECRET_KEY || "qwertyuiopasdfghjklzxcvbnmqwerty";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
                user: 'ny88119@gmail.com',
                pass: 'xhni prjn chca oyfz',
            },
});

 login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please enter correct credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Please enter correct password" });
        }
        const payload = { user: { id: user.id, role: user.role } };
        const authToken = jwt.sign(payload, jwtSecretKey, { expiresIn: '1d' });
        return res.json({ userData: user, authToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 register = async (req, res) => {
    const { name, email, role, password, otp } = req.body;
    try {
        const otpUser = await otpModel.findOne({ email });
        if (!otpUser) {
            return res.status(400).json({ message: "Invalid request", status: 206 });
        }
        if (otpUser.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired", status: 202 });
        }
        if (otpUser.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", status: 203 });
        }

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered", status: 204 });
        }

        await otpModel.findOneAndDelete({ email });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new userModel({ name, email, password: hashedPassword, role });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

 sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = randomstring.generate({ length: 6, charset: '0123456789' });
    try {
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);

        const user = await userModel.findOne({ email });
        if (user) {
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        } else {
            const existingOtp = await otpModel.findOne({ email });
            if (existingOtp) {
                await otpModel.updateOne({ email }, { $set: { otp, otpExpires } });
            } else {
                await new otpModel({ email, otp, otpExpires }).save();
            }
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for Registration',
            text: `Your OTP for registration is ${otp}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

 verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", status: 207 });
        }
        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired", status: 202 });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", status: 203 });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        const authToken = jwt.sign(payload, jwtSecretKey, { expiresIn: '1d' });

        res.json({ userData: user, authToken });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

 resendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = randomstring.generate({ length: 6, charset: '0123456789' });
    try {
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);

        const user = await userModel.findOne({ email });
        if (user) {
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        } else {
            const existingOtp = await otpModel.findOne({ email });
            if (existingOtp) {
                await otpModel.updateOne({ email }, { $set: { otp, otpExpires } });
            } else {
                return res.status(400).json({ message: "Invalid request", status: 206 });
            }
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for Registration',
            text: `Your OTP for registration is ${otp}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

 userDetails = async (req, res) => {
    try {
        const id = req.data.user.id;
        const userDetail = await userModel.findById(id);
        res.status(200).json({ status: 200, userData: userDetail });
    } catch (error) {
        res.status(400).json({ error });
    }
};

 updateDetails = async (req, res) => {
    try {
        const id = req.data.user.id;
        const newProfileImage = req.file ? { profile_image: req.file.filename } : {};
        const existingData = await userModel.findById(id);

        if (existingData.fee_per_consultation !== req.body.fee_per_consultation
            || existingData.work_experience !== req.body.work_experience
            || existingData.qualification !== req.body.qualification
            || existingData.specialization !== req.body.specialization) {
            req.body.approval = 1;
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, { ...req.body, ...newProfileImage }, { new: true });
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(404).send(error);
    }
};

changePassword = async (req, res) => {
    try {
      const { email, password, otp } = req.body;
  
      // Input validation
      if (!email || !password || !otp) {
        return res.status(400).json({ status: 400, message: 'All fields are required' });
      }
  
      const userdata = await userModel.findOne({ email });
      if (!userdata) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }
  
      if (userdata.otpExpires < new Date()) {
        // send response that otp expires
        return res.status(410).json({ status: 410, message: 'OTP expired' });
      }
  
      if (userdata.otp !== otp) {
        // send response for invalid otp
        return res.status(401).json({ status: 401, message: 'Invalid OTP' });
      }
  
      userdata.otp = undefined;
      userdata.otpExpires = undefined;
  
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);
      userdata.password = secPassword;
      await userdata.save();
  
      res.status(200).json({ status: 200, message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error in changePassword:', error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  };


  const sendOtppassword = async (req, res) => {
    const { email } = req.body;
    const charset = '0123456789';
    const otp = randomstring.generate({
        length: 6,
        charset: charset,
    });

    try {
        if (!email) {
            return res.status(400).json({ status: 400, message: 'Email is required' });
        }

        const userdata = await userModel.findOne({ email });
        if (!userdata) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);

        userdata.otp = otp;
        userdata.otpExpires = otpExpires;
        await userdata.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for Change Password',
            text: `Your OTP for Change Password is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error in sendOtppassword:', error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};


module.exports = {
    register,
    login,
    sendOtp,
    resendOtp,
    verifyOtp,
    userDetails,
    updateDetails,
    changePassword,
    sendOtppassword
};


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const jwtSecretKey = "qwertyuiopasdfghjklzxcvbnmqwerty";
// const userModel = require('../models/users');
// const randomstring = require('randomstring');
// const nodemailer = require('nodemailer');
// const otpModel = require('../models/otp')



// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'ny88119@gmail.com',
//         pass: 'xhni prjn chca oyfz',
//     },
// });


// const login = async (req, res) => {
//     let email = req.body.email;
//     let pwd = req.body.password;
//     try {
//         const data = await userModel.findOne({ email });
//         if (!data) {
//             return res.status(400).json({ message: "please enter correct credentials" });
//         }
//         const password = await bcrypt.compare(pwd, data.password);
//         if (!password) {
//             return res.status(400).json({ message: "please enter correct password" });
//         }
//         const key = { user: { id: data.id, role: data.role } };
//         const options = {
//             expiresIn: '1d',
//         };
//         const authToken = jwt.sign(key, jwtSecretKey, options);
//         return res.json({ userData: data, authToken: authToken });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }








// const register = async (req, res) => {
//     try {
//         const { name, email, role, password, otp } = req.body;
//         let otpuser = await otpModel.findOne({ email });
//         console.log(otpuser)
//         if (otpuser) {
//             if (otpuser.otpExpires < new Date()) {
//                 // send response that otp expires
//                 return res.status(200).json({ status: 202 });
//             }
//             if (otpuser.otp !== otp) {
//                 //send response for invalid otp
//                 return res.status(200).json({ status: 203 })
//             }
//             else {
//                 let user = await userModel.findOne({ email });
//                 if (!user) {
//                     await otpModel.findOneAndDelete({ email });
//                     const salt = await bcrypt.genSalt(10);
//                     const secPassword = await bcrypt.hash(password, salt);
//                     const data = new userModel(
//                         {
//                             name: name,
//                             email: email,
//                             password: secPassword,
//                             role: role
//                         }
//                     );
//                     savedData = await data.save();
//                     // send response for successfull regestration
//                     res.status(200).json(savedData);
//                 }
//                 else {
//                     //send response already registered
//                     res.status(200).send({ status: 204 });
//                 }
//             }
//         }
//         else {
//             //invalid request
//             res.status(200).send({ status: 206 });
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send('Server Error');
//     }
// }


// const sendOtp = async (req, res) => {
//     const { email } = req.body;
//     const charset = '0123456789';
//     const otp = randomstring.generate({
//         length: 6,
//         charset: charset,
//     });
//     try {
//         const userdata = await userModel.findOne({ email });
//         if (userdata) {
//             const otpExpires = new Date();
//             otpExpires.setMinutes(otpExpires.getMinutes() + 5);
//             userdata.otp = otp
//             userdata.otpExpires = otpExpires
//             await userdata.save()
//         }
//         else {
//             const newOtp = await otpModel.findOne({ email })
//             const otpExpires = new Date();
//             otpExpires.setMinutes(otpExpires.getMinutes() + 5);
//             if (newOtp) {
//                 await otpModel.updateOne({ email: email }, { $set: { otp: otp, otpExpires: otpExpires } });
//             } else {
//                 await new otpModel({
//                     email: email,
//                     otp: otp,
//                     otpExpires: otpExpires
//                 }).save()
//             }


//         }
//         const mailOptions = {
//             from: 'ny88119@gmail.com',
//             to: email,
//             subject: 'OTP for Registration',
//             text: `Your OTP for registration is ${otp}`,
//         };
//         await transporter.sendMail(mailOptions);
//         res.status(200).send({ status: 200 });
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ status: 500 });
//     }
// }

// const verifyOtp = async (req, res) => {
//     const { email, otp } = req.body;
//     try {
//         let user = await userModel.findOne({ email });
//         if (!user) {
//             //send otp if user does not exist
//             return res.status(200).json({ status: 207 });
//         }
//         if (user.otpExpires < new Date()) {
//             // send response that otp expires
//             return res.status(200).json({ status: 202 });
//         }
//         if (user.otp !== otp) {
//             //send response for invalid otp
//             return res.status(200).json({ status: 203 })
//         }
//         user.otp = undefined;
//         user.otpExpires = undefined;
//         await user.save();
//         const key = { user: { id: user.id, role: user.role } };
//         const options = {
//             expiresIn: '1d',
//         };

//         const authToken = jwt.sign(key, jwtSecretKey, options);
//         return res.json({ userData: user, authToken: authToken });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// }

// //resend otp 
// const resendOtp = async (req, res) => {

//     const { email } = req.body;
//     const charset = '0123456789';
//     const otp = randomstring.generate({
//         length: 6,
//         charset: charset,
//     });
//     try {
//         const userdata = await userModel.findOne({ email });
//         if (userdata) {
//             const otpExpires = new Date();
//             otpExpires.setMinutes(otpExpires.getMinutes() + 5);
//             userdata.otp = otp
//             userdata.otpExpires = otpExpires
//             await userdata.save()
//         }
//         else {
//             const newOtp = await otpModel.findOne({ email })
//             const otpExpires = new Date();
//             otpExpires.setMinutes(otpExpires.getMinutes() + 5);
//             if (newOtp) {
//                 await otpModel.updateOne({ email: email }, { $set: { otp: otp, otpExpires: otpExpires } });
//             } else {
//                 //invalid request
//                 res.status(200).send({ status: 206 });

//             }


//         }
//         const mailOptions = {
//             from: 'ny88119@gmail.com',
//             to: email,
//             subject: 'OTP for Registration',
//             text: `Your OTP for registration is ${otp}`,
//         };
//         await transporter.sendMail(mailOptions);
//         res.status(200).send({ status: 200 });
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ status: 500 });
//     }
// }


// const userDetails = async (req,res) =>{
//     try {
//         const id = req.data.user.id;
//         const userDetail = await userModel.findById( id );
//         console.log(userDetail)
//         res.status(200).json({ status: 200, userData: userDetail });
//     } catch (error) {
//         res.status(400).json({ error: error });
//     }
// }


// const updateDetails = async (req, res) => {
//     try {
//         const id = req.data.user.id
//         const newProfileImage = req.file ? { profile_image: req.file.filename } : {};
//         const existingData = await userModel.findById({ _id: id });
//         if (existingData.fee_per_consultation !== req.body.fee_per_consultation
//             || existingData.work_experience !== req.body.work_experience
//             || existingData.qualification !== req.body.qualification
//             || existingData.specialization !== req.body.specialization) {
//             req.body.approval = 1;
//         }
//         const userData = await userModel.findByIdAndUpdate(id, { ...req.body, ...newProfileImage }, { new: true });
//         res.status(200).json({ data: userData });

//     }
//     catch (error) {
//         console.log(error)
//         res.status(404).send(error);
//     }
// }
// module.exports = {
//     register,
//     login,
//     sendOtp,
//     resendOtp,
//     verifyOtp,
//     userDetails,
//     updateDetails
// }