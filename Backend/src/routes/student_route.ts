import express from "express";
const router = express.Router();
import studentController from "../controllers/student_controller";

router.get("/", studentController.get.bind(studentController));
router.get("/:id", studentController.getById.bind(studentController));

router.post("/", studentController.post.bind(studentController));

router.put("/:id", studentController.put.bind(studentController));

router.delete("/:id", studentController.remove.bind(studentController));

export default router;