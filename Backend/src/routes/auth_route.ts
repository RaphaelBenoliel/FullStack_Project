import express from "express";
import authController from "../controllers/auth_controller";

const router = express.Router();


/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - user
*       properties:
*         user:
*           type: object
*           required:
*             - email
*             - password
*             - name
*             - phone
*             - address
*             - imgUrl
*           properties:
*             email:
*               type: string
*               description: The user email
*             password:
*               type: string
*               description: The user password
*             name:
*               type: string
*               description: The user name
*             phone:
*               type: string
*               description: The user phone
*             address:
*               type: string
*               description: The user address
*             imgUrl:
*               type: string
*               description: The user imgUrl
*           example:
*             email: 'bob@gmail.com'
*             password: '123456'
*             name: 'Bob'
*             phone: '1234567890'
*             address: '1234 Main St'
*             imgUrl: 'https://www.google.com'
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The JWT access token
*         refreshToken:
*           type: string
*           description: The JWT refresh token
*       example:
*         accessToken: '123cd123x1xx1'
*         refreshToken: '134r2134cr1x3c'
*/


/**
* @swagger
* /auth/register:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post("/register", authController.register);
/**
* @swagger
* /auth/google:
*   post:
*     summary: Sign in with Google
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               idToken:
*                 type: string
*                 description: The Google ID token
*             example:
*               idToken: 'google-id-token'
*     responses:
*       200:
*         description: The access & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/
router.post('/google', authController.googleSignIn);

/**
* @swagger
* /auth/login:
*   post:
*     summary: login existing user by email and password
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: The user email
*               password:
*                 type: string
*                 description: The user password
*             example:
*               email: 'bob@gmail.com'
*               password: '123456'
*     responses:
*       200:
*         description: The access & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/
router.post("/login", authController.login);

/**
* @swagger
* /auth/logout:
*   get:
*     summary: logout a user
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
*/
router.get("/logout/:id", authController.logout);

/**
* @swagger
* /auth/refresh:
*   get:
*     summary: get a new access and refresh tokens using the refresh token
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The acess & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/
router.get("/refresh", authController.refresh);
export default router;