"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
/**
* @swagger
* tags:
*   name: PostRoute
*   description: The Post API
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - comment
 *         - commentUrl
 *       properties:
 *         comment:
 *           type: string
 *           description: The user comment
 *         commentUrl:
 *           type: string
 *           description: The user commentUrl
 *         owner:
 *           type: object
 *           required:
 *             - _id
 *             - name
 *             - imgUrl
 *           properties:
 *             _id:
 *               type: string
 *               description: The user _id
 *             name:
 *               type: string
 *               description: The user name
 *             imgUrl:
 *               type: string
 *               description: The user imgUrl
 *       example:
 *         comment: 'This is a comment'
 *         commentUrl: 'https://www.google.com'
 *         owner:
 *           _id: '123456'
 *           name: 'Bob'
 *           imgUrl: 'https://www.google.com'
 */
/**
 * @swagger
 * /post:
 *  get:
 *    summary: Get all posts
 *    tags: [PostRoute]
 *    responses:
 *      200:
 *        description: The list of posts
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Post'
 */
router.get("/", post_controller_1.default.get.bind(post_controller_1.default));
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [PostRoute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.get("/:id", post_controller_1.default.getById.bind(post_controller_1.default));
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [PostRoute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/", post_controller_1.default.post.bind(post_controller_1.default));
/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [PostRoute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.put("/:id", post_controller_1.default.put.bind(post_controller_1.default));
/**
 * @swagger
 * /post:
 *   put:
 *     summary: Update all posts by owner
 *     tags: [PostRoute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put("/", post_controller_1.default.updateOwnerPosts.bind(post_controller_1.default));
/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Remove a post
 *     tags: [PostRoute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */
router.delete("/:id", post_controller_1.default.remove.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map