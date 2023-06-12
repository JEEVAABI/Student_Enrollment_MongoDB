const express = require('express')

const router = express.Router()

const studentModel = require('../models/students');

const imageupload = require("../middlewares/imageupload")


router.get('/',async(request,response)=>{
    try{
    //response.send("Display student")
    const students = await studentModel.find();
    response.status(200).json(students)
    }
    catch(error){
        // console.log(error);
        response.status(500).json({message:error.message})
    }
})


router.post('/',imageupload.single('studentimage'),async(request,response)=>{
    // response.send("Adding new stdents")
    const { name, enrolledDeparment, enrollmentDate } = request.body;
    const studentimage = request.file ? request.file.path : null;
    try {
        const newStudent = new studentModel({
          name,
          enrolledDeparment,
          enrollmentDate,
          studentimage
        });
    
        const student = await newStudent.save();
        response.status(201).json(student);
      } catch (error) {
        response.status(500).json({ message: error.message });
      }
    // const newStudent = new studentModel({
    //     name: request.body.name ,
    //     enrolledDeparment:request.body.enrolledDeparment ,
    //     enrollmentDate:request.body.enrollmentDate,
    //     studentimage:request.file.path
    // })
    // if(request.file){
    //     newStudent.studentimage = request.file.path
    // }

    // try{
    //     const student = await newStudent.save();
    //     response.status(201).json(student)
    // }
    // catch(error){
    //     response.status(500).json({message:error.message})
    // }
})

router.get('/:id',getStudent,(request,response)=>{

    response.status(200).json(response.student)
})

router.patch('/:id',getStudent,async(request,response)=>{
    //response.send(`Update on student id ${request.params.id}`)
    if(request.body.name != null){
        response.student.name = request.body.name;
    }
    if(request.body.enrolledDeparment != null){
        response.student.enrolledDeparment = request.body.enrolledDeparment;
    }
    try{
        const updateStudent = await response.student.save();
        response.status(400).json({message:error.message})
    }
    catch{
        response.status(403).json({message:error.message})
    }
})


router.delete('/:id',getStudent,async(request,response)=>{
    //response.send(`delete on student id ${request.params.id}`)
    try{
        await response.student.deleteOne();
        response.json({message:`Deleted ${response.student.name}`})
    }
    catch{
        response.status(500).json({message:error.message})
    }
})

async function getStudent(request,response,next){
    let student
    try{
        student = await studentModel.findById(request.params.id)
        if(student==null){
            return response.status(404).json({message:`cannot find user with id ${request.params.id}`})
        }
    }
    catch{
        return response.status(500).json({message:error.message})
    }
    response.student = student;
    next();
}
module.exports = router