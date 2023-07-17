const express = require('express');
const student = require('../modal/student.js');
const Student = require('../modal/student.js');
const Teacher = require('../middlewear/teacher');

//inserting 
const Insert =  async (req, res)=>{
    try {
        const { name , phone , email , address } = req.body
        //checking the mail
        let checkMail = await Student.findOne({ email });
        if(checkMail){
            console.log("----------------------------------------------------------------")
            console.log(" Email is Already exist, Please provide another email ID !")
            console.log("----------------------------------------------------------------")
            return res.status(400).json({errors : " Email already exist !"})
        }
        
        const student = new Student({name, phone, email, address , teacher_id:req.teacher.id})
        const savedStudents = await student.save();
        let success = true;
        res.json({ success , savedStudents })
    }
    catch (error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//getting
const GetStudent = async ( req , res ) => {
    try {
        const student = await Student.find({teacher_id:req.teacher.id});
        res.json(student);
    }
    catch (error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//deleting
const Delete = async ( req , res ) => {
    try{
        let student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).send(' Student not found!');
            console.log(" Student not found with this ID, Please check the ID which you specified !");
        }
        student = await Student.findByIdAndDelete(req.params.id);
        res.json({" Success " : " Student deleted Successfully...",
        student : student })
        console.log(" Student deleted Successfully.... ")
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const Update = async (req, res) => {
    const { name , phone , email ,  address } = req.body
    try {
        const newStudent = {};
        if (name){ newStudent.name = name };
        if (phone){ newStudent.phone = phone };
        if (email){ newStudent.email = email };
        if (address){ newStudent.address = address };
        //newStudent={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let student = await Student.findById(req.params.id);
        if(!student){
            res.status(404).send(" Not Found !")
        }
        student = await Student.findByIdAndUpdate(req.params.id, {
            $set: newStudent }, { new : true })
            res.json({ student });
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view
const View = async ( req, res ) =>{
    try{
        let student = await Student.findById(req.params.id);
        if(!student){
            res.status(404).send(" Not Found !")
        }
        res.json(student);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(" Internal error Occurred ! ");
}
}
module.exports = { Insert , GetStudent , Delete , Update , View};