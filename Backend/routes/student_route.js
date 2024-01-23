const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student_controller");

router.get("/", StudentController.getStudents);

router.post("/", StudentController.postStudents);

router.put("/", StudentController.putStudents);

router.delete("/", StudentController.deleteStudents);

module.exports = router;