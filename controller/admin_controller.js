const express = require('express');
const Admin = require('../modal/admin.js');

const Insert =  async (req, res)=>{
    try {
        const { name , position , phone , email , address } = req.body
        //checking the position
        let checkPosition = await Admin.findOne({ position });
        if(checkPosition){
            console.log("----------------------------------------------------------------")
            console.log(` The person with this ${position} position is Already exist, Please provide correct position of the Admin !`)
            console.log("----------------------------------------------------------------")
            return res.status(400).json({errors : " This position is occupied !"})
        }
        
        const admin = new Admin({name , position , phone , email , address })
        const savedAdmin = await admin.save();
        let success = true;
        res.json({ success , savedAdmin })
    }
    catch (error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}

const GetAdmin = async ( req , res ) => {
    try {
        const admin = await Admin.find();
        res.json(admin);
    }
    catch (error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//deleting
const Delete = async ( req , res ) => {
    try{
        let admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(404).send(' Admin not found!');
            console.log(" Admin not found with this ID, Please check the ID which you specified !")
        }
        admin = await Admin.findByIdAndDelete(req.params.id);
        res.json({" Success " : " Admin deleted Successfully...",
        admin : admin })
        console.log(" Admin deleted Successfully.... ")
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const Update = async (req, res) => {
    const { name , position, phone , email ,  address } = req.body
    try {
        const newAdmin = {};
        if (name){ newAdmin.name = name };
        if (name){ newAdmin.position = position };
        if (phone){ newAdmin.phone = phone };
        if (email){ newAdmin.email = email };
        if (address){ newAdmin.address = address };
        //newAdmin={
        //     name:"name",
        //      position:"position",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let admin = await Admin.findById(req.params.id);
        if(!admin){
            res.status(404).send(" Not Found !")
        }
        admin = await Admin.findByIdAndUpdate(req.params.id, {
            $set: newAdmin }, { new : true })
            res.json({ admin });
        }
        catch(err){
            console.err(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}
module.exports = { Insert , GetAdmin , Delete , Update};