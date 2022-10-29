const signature = require('../modules/signuploadform')
const router =  require('express').Router()
const User = require('../models/User')


module.exports.getForm=async (req, res)=>{

    const foundUser = await User.findById(req.user._id).lean()
    console.log(foundUser)
    const userGroups = [...foundUser.groups,'public']

    res.render('repairform.ejs',{
        title:"Repair Submission",
        user:req.user,
        groups:userGroups,
    });
},



module.exports.signForm=async (req, res)=>{
    
    //todo get signature and respond
    const sig = signature.signuploadform();
    console.log(`signform signature received `, sig)

    try{
        res.status(200).json({
            signature: sig.signature,
            timestamp: sig.timestamp,
            cloudname: process.env.cloud_name,
            apikey: process.env.cloud_key,
            folder:process.env.cloud_folder
        })
    }catch(error){
    } 
}


