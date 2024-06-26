"use strict";
// const Student = require("../models/student_model");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const student_model_1 = __importDefault(require("../models/student_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
class StudentController extends base_controller_1.default {
    constructor() {
        super(student_model_1.default);
    }
}
exports.default = new StudentController();
//# sourceMappingURL=student_controller.js.map