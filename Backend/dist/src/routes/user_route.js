"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware")); // Add this line to import the authMiddleware module
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
router.get("/", user_controller_1.default.get.bind(user_controller_1.default));
router.get("/:token", user_controller_1.default.getUser.bind(user_controller_1.default));
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
router.put("/:id", user_controller_1.default.put.bind(user_controller_1.default));
// router.get("/:id", authMiddleware, studentController.getById.bind(studentController));
// router.post("/", authMiddleware, studentController.post.bind(studentController));
// router.put("/:id", authMiddleware, studentController.put.bind(studentController));
router.delete("/:id", auth_middleware_1.default, user_controller_1.default.remove.bind(user_controller_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map