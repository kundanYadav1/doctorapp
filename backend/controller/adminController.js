const userModel = require('../models/users');
const inventoryModel = require('../models/inventory')

// Function to get approval request list
 getApprovalRequestList = async (req, res) => {
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
approveDoctor = async (req, res) => {
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
getDoctorDetails = async (req, res) => {
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

getAllInventory = async (req,res)=>{
    if(req.data.user.role == "admin"){
        try{
            const inventoryDetails =await inventoryModel.find()
            res.status(200).json(inventoryDetails)
        }catch(error){
            //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
            res.status(500).json({status:500}) 
        }
        }
        else{
            //send this code when the access user is not admin
            res.status(400).json({status:401})
        }
}
updateInventory = async(req,res)=>{
    if(req.data.user.role == "admin"){
        try{
            console.log(req.body.medicine_name)
             req.body.medicine_name = req.body.medicine_name.toLowerCase()
            const inventoryDetails =await inventoryModel.findOneAndUpdate({medicine_name:req.body.medicine_name},req.body,{ new: true })
            res.status(200).json(inventoryDetails)
        }catch(error){
            //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
            res.status(500).json({status:500}) 
        }
        }
        else{
            //send this code when the access user is not admin
            res.status(400).json({status:401})
        }
}

bulkInsertInventory = async(req,res)=>{
    if(req.data.user.role == "admin"){
    try{
    const doc = req.body.data
    doc.forEach(obj => {
        obj.medicine_name=obj.medicine_name.toLowerCase()
      });
    const result = await inventoryModel.bulkWrite(
        doc.map(obj => ({
            updateOne: {
                filter: { medicine_name: obj.medicine_name },
                update: { $set: obj },
                upsert: true 
            }
        }))
    );

    res.status(200).json({status:200})
    }catch(error){
        console.log(error)
        res.status(500).json({status:500}) 
    }
    }
    else{
        res.status(400).json({status:401})
    }
}

module.exports = {
    getApprovalRequestList,
    approveDoctor,
    getDoctorDetails,
    getAllInventory,
    updateInventory,
    bulkInsertInventory

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