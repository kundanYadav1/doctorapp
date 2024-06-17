const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "qwertyuiopasdfghjklzxcvbnmqwerty";
const userModel = require('../models/users');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const otpModel = require('../models/otp')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ny88119@gmail.com',
        pass: 'xhni prjn chca oyfz',
    },
});
const sendOtp = async(req,res)=>{
    const { email } = req.body;
    const charset = '0123456789';
    const otp =randomstring.generate({
               length: 6,
               charset: charset,
        });
    try{
        const userdata = await userModel.findOne({ email });
        if(userdata){
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);
        userdata.otp=otp
        userdata.otpExpires=otpExpires
        await userdata.save()
        }
        else{
           const newOtp = await otpModel.findOne({email})
           const otpExpires = new Date();
           otpExpires.setMinutes(otpExpires.getMinutes() + 5);
           if(newOtp){
               await otpModel.updateOne({ email: email }, { $set: { otp: otp, otpExpires: otpExpires } });
           }else{
            await new otpModel({
                email:email,
                otp:otp,
                otpExpires:otpExpires
             }).save()
           }
           
          
        }
        const mailOptions = {
            from: 'ny88119@gmail.com',
            to: email,
            subject: 'OTP for Registration',
            text: `Your OTP for registration is ${otp}`,
        };
       await transporter.sendMail(mailOptions);
       res.status(200).send({status:200});
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:500});
    }
}
//resend otp 
const resendOtp = async(req,res)=>{
    
    const { email } = req.body;
    const charset = '0123456789';
    const otp =randomstring.generate({
               length: 6,
               charset: charset,
        });
    try{
        const userdata = await userModel.findOne({ email });
        if(userdata){
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);
        userdata.otp=otp
        userdata.otpExpires=otpExpires
        await userdata.save()
        }
        else{
           const newOtp = await otpModel.findOne({email})
           const otpExpires = new Date();
           otpExpires.setMinutes(otpExpires.getMinutes() + 5);
           if(newOtp){
               await otpModel.updateOne({ email: email }, { $set: { otp: otp, otpExpires: otpExpires } });
           }else{
             //invalid request
             res.status(200).send({status:206});
            
           }
           
          
        }
        const mailOptions = {
            from: 'ny88119@gmail.com',
            to: email,
            subject: 'OTP for Registration',
            text: `Your OTP for registration is ${otp}`,
        };
       await transporter.sendMail(mailOptions);
       res.status(200).send({status:200});
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:500});
    }
}
const register = async(req,res)=>{
    try{
        const { name,email,role ,password,otp} = req.body;
        let otpuser = await otpModel.findOne({ email });
        console.log(otpuser)
        if (otpuser){
            if (otpuser.otpExpires < new Date()) {
                // send response that otp expires
                return res.status(200).json({status:202 });
            }
            if (otpuser.otp !== otp){
                //send response for invalid otp
                return res.status(200).json({status:203})
            }
            else{
            let user = await userModel.findOne({ email }); 
            if(!user){
                await otpModel.findOneAndDelete({ email });
                const salt = await bcrypt.genSalt(10);
                const secPassword = await bcrypt.hash(password, salt);
                const data = new userModel(
                              {
                                  name: name,
                                  email: email,
                                  password: secPassword,
                                  role: role
                              }
                          );
                         savedData=await data.save();
                  // send response for successfull regestration
                  res.status(200).json(savedData);
              }
              else {
                  //send response already registered
                  res.status(200).send({status:204});
              }
            }
        }
        else{
            //invalid request
            res.status(200).send({status:206});
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send('Server Error');
    }
}
const login = async (req,res)=>{
    let email =req.body.email;
    let pwd =req.body.password;
    try{
        const data = await userModel.findOne({email});
        if (!data){
            return res.status(400).json({message:"please enter correct credentials"});
        }
        const password =await bcrypt.compare(pwd, data.password);
        if(!password){
            return res.status(400).json({message:"please enter correct password"});
        }
        const key = {user:{id:data.id, role:data.role} };
        const options = {
            expiresIn: '1d',
        };
        const authToken = jwt.sign(key,jwtSecretKey,options);
        return res.json({userData: data, authToken: authToken});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const userDetail=async(req,res)=>{
    try{
        console.log(req.data)
        const id=req.data.user.id;
        const userDetail=await userModel.findById(id);
        console.log(userDetail)
        res.status(200).json({status:200,userData:userDetail});
    }catch(error){
        console.log(error)
        res.status(400).json({error:error});
    }
}
module.exports={
    register,
    login,
    sendOtp,
    resendOtp,
    userDetail
}