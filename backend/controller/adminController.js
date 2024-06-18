const userModel = require('../models/users');

// Function to get approval request list
const getApprovalRequestList = async (req, res) => {
    if (req.data.user.role === "admin") {
        try {
            const doctorsList = await userModel.find({ role: 'doctor', approval: 1 });
            return res.status(200).json({ status: 200, doctorsList: doctorsList });
        } catch (error) {
            console.error('Error fetching approval request list:', error);
            return res.status(500).json({ status: 500, message: error.message });
        }
    } else {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
};

// Function to approve doctor
const approveDoctor = async (req, res) => {
    if (req.data.user.role === "admin") {
        try {
            const { id } = req.body;    
            const updateData = { approval: 2 };

            // Using findByIdAndUpdate to update the user's approval status
            const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ status: 404, message: 'User not found' });
            }

            return res.status(200).json({ status: 200, updatedUser: updatedUser });
        } catch (error) {
            console.error('Error approving doctor:', error);
            return res.status(500).json({ status: 500, message: error.message });
        }
    } else {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
};

// Function to get doctor details
const getDoctorDetails = async (req, res) => {
    if (req.data.user.role === "admin") {
        try {
            const id = req.query.id;

            if (!id) {
                return res.status(400).json({ status: 400, message: 'Doctor ID is required' });
            }

            const userDetails = await userModel.findById(id);

            if (!userDetails) {
                return res.status(404).json({ status: 404, message: 'Doctor not found' });
            }

            return res.status(200).json({ status: 200, userDetails: userDetails });
        } catch (error) {
            console.error('Error fetching doctor details:', error);
            return res.status(500).json({ status: 500, message: error.message });
        }
    } else {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
};

module.exports = {
    getApprovalRequestList,
    approveDoctor,
    getDoctorDetails
};



// const userModel = require ('../models/users')
//  getApprovalRequestList = async(req,res)=>{
//     if(req.data.user.role === "admin"){
//     try {
//         const doctorsList = await userModel.find({ role: 'doctor', approval: 1 });
//         res.status(200).json({ status : 200,doctorsList: doctorsList });
//     } catch (error) {
//         res.status(404).json(error);
//     }
// }
// else{
//     res.status(400).json({ status: 401 });
// }
// }

// approveDoctor = async(req,res)=>{
//     if(req.data.user.role == "admin"){
//     try{
//         const {id} = req.body
//         const updateData ={
//             approval:2
//         }
//         const updatedUser = await userModel(id,updateData,{new:true})
//         res.send(200).json({status:200})
    
//     }catch(error){
//         console.log(error)
//         res.status(500).json({status:500})
    
//     }
//     }
// }
// getDoctorDetails=async(req,res)=>{
//     if(req.data.user.role == "admin"){
//         try{
//             console.log(req.query.id)
//             const id = req.query.id
//             const updateData ={
//                 approval:2
//             }
//             const userDetails =await userModel.findById({_id:id})
//             res.status(200).json(userDetails)
        
//         }catch(error){
//             console.log(error)
//             res.status(500).json({status:500})
        
//         }
//         }
//         else{
//             res.status(400).json({status:401})
//         }
// }

// module.exports = {
//     getApprovalRequestList,
//     approveDoctor,
//     getDoctorDetails
// } 