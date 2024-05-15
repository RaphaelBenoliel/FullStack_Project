import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
// import authMiddleware from "../common/auth_middleware";

// router.get("/", authMiddleware, studentController.get.bind(studentController));
router.post("/", UserController.getUser.bind(UserController));
router.put("/:id", UserController.put.bind(UserController));
// router.get("/:id", authMiddleware, studentController.getById.bind(studentController));

// router.post("/", authMiddleware, studentController.post.bind(studentController));

// router.put("/:id", authMiddleware, studentController.put.bind(studentController));

// router.delete("/:id", authMiddleware, studentController.remove.bind(studentController));

export default router;