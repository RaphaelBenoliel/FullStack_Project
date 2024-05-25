import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware"; // Add this line to import the authMiddleware module

// import authMiddleware from "../common/auth_middleware";


/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User API
 */


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", UserController.get.bind(UserController));
router.get("/:token", UserController.getUser.bind(UserController));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Updates a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", UserController.put.bind(UserController));
// router.get("/:id", authMiddleware, studentController.getById.bind(studentController));

// router.post("/", authMiddleware, studentController.post.bind(studentController));

// router.put("/:id", authMiddleware, studentController.put.bind(studentController));

router.delete("/:id", authMiddleware, UserController.remove.bind(UserController));

export default router;



