// const Student = require("../models/student_model");

// const getStudents = async (req, res) => {
//   console.log("student get");
//   try {
//     let student;
//     if (req.query.name) {
//       student = await Student.find({ name: req.query.name });
//     } else {
//       student = await Student.find();
//     }
//     res.status(200).send(student);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error.message);
//   }
// };


// const getStudentById = async (req, res) => {
//   console.log(req.params);
//   try {
//     const student = await Student.findById(req.params.id);
//     res.status(200).send(student);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error.message);
//   }
// };


// const postStudents = async (req, res) => {
//   console.log("student post");
//   try {
//     const student = await Student.create(req.body);
//     res.status(201).send(student);
//   } catch(error){
//       console.log(error);
//       res.status(400).send(error.message);
//   }
  
// };
  
// const putStudents = async (req, res) => {
//   console.log("student put");
//   try{
//     const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
//     res.status(200).send({student, message: "Student updated successfully"
//     });

//   }catch(error){
//       console.log(error);
//       res.status(400).send(error.message);
//   }
// };

// const deleteStudents = async (req, res) => {
//   console.log("student delete");
//   try {
//     await Student.findByIdAndDelete(req.params.id);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error.message);
//   }
// };

// module.exports = { getStudents, postStudents, putStudents, deleteStudents, getStudentById };

import Student from "../models/student_model";
import BaseController from "./base_controller";
import { IStudent } from "../models/student_model";

class StudentController extends BaseController<IStudent> {
  constructor() {
    super(Student);
  }

}

export default new StudentController();