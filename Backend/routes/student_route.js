const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student_controller");

router.get("/", StudentController.getStudents);
router.get("/:id", StudentController.getStudentById);

router.post("/", StudentController.postStudents);

router.put("/:id", StudentController.putStudents);

router.delete("/:id", StudentController.deleteStudents);

module.exports = router;