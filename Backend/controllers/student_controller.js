const Student = require("../models/student_model");

const getStudents = (req, res) => {
    res.send("student get");
  };
  const getStudentById = (req, res) => {
    console.log(req.params);
    res.send("student get by id");
  };
  
  const postStudents = async (req, res) => {
    console.log("student post");
    try {
      const student = await Student.create(req.body);
      res.status(201).send(student);
    } catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
    
  };
  
  const putStudents = (req, res) => {
    res.send("student put");
  };
  
  const deleteStudents = (req, res) => {
    res.send("student delete");
  };
  
  module.exports = { getStudents, postStudents, putStudents, deleteStudents, getStudentById };