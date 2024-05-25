"use strict";
// import request from "supertest";
// import appInit from "../App";
// import mongoose from "mongoose";
// import Post from "../models/post_model";
// import { Express } from "express";
// import User from "../models/user_model";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let app: Express;
// const testUser = {
//     email: "post@gmail.com",
//     password: "123456",
//     accessToken: null
// }
// beforeAll(async () => {
//     app = await appInit();
//     console.log("beforeAll");
//     await Post.deleteMany();
//     await User.deleteMany({ email: testUser.email });
//     await request(app).post("/auth/register").send(testUser);
//     const res = await request(app).post("/auth/login").send(testUser);
//     testUser.accessToken = res.body.accessToken;
// });
// afterAll(async () => {
//     console.log("afterAll");
//     await mongoose.connection.close();
// });
// describe("Student", () => {
//     test("Get /post - empty collection", async () => {
//         const res = await request(app).get("/post");
//         expect(res.statusCode).toBe(200);
//         const data = res.body;
//         expect(data).toEqual([]);
//     });
//     const post = {
//         title: "this is post title",
//         message: "this is my post message ..... ",
//         owner: "Moshe"
//     }
//     test("Post /post - empty collection", async () => {
//         const res = await request(app).post("/post")
//             .set('Authorization', 'Bearer ' + testUser.accessToken)
//             .send(post);
//         expect(res.statusCode).toBe(201);
//     });
// });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const App_1 = __importDefault(require("../App"));
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let app;
const testUser = {
    email: 'testuser@gmail.com',
    password: 'password',
    name: 'Updated Test User',
    phone: '1234567890',
    address: 'Test Address',
    imgUrl: 'http://example.com/image.png'
};
const testPost = {
    comment: 'This is a comment',
    commentUrl: 'https://www.google.com',
};
let userId;
let token;
let postId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log('beforeAll');
    yield user_model_1.default.deleteMany({ email: testUser.name });
    yield post_model_1.default.deleteMany({ commentUrl: testPost.commentUrl });
    // Create a user to test with
    const res = yield (0, supertest_1.default)(app).post('/auth/register').send({ user: testUser });
    console.log(res.body);
    userId = res.body._id;
    const loginRes = yield (0, supertest_1.default)(app).post('/auth/login').send({
        email: testUser.email,
        password: testUser.password
    });
    token = loginRes.body.refreshToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('afterAll');
    yield mongoose_1.default.connection.close();
}));
describe('Post API tests', () => {
    test('POST /post - should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/post').send(Object.assign(Object.assign({}, testPost), { owner: {
                _id: userId,
                name: testUser.name,
                imgUrl: testUser.imgUrl
            } })).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        postId = res.body._id;
    }));
    test('GET /post - should return all posts', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/post').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    test('GET /post/:id - should return a post by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', postId);
    }));
    test('PUT /post/:id - should update a post', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = {
            comment: 'Updated comment'
        };
        yield (0, supertest_1.default)(app).put(`/post/${postId}`).send(updatedData).set('Authorization', `Bearer ${token}`);
        const res = yield (0, supertest_1.default)(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('comment', 'Updated comment');
    }));
    test('PUT /post - should update all posts by owner', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).put('/post').send(userId).set('Authorization', `Bearer ${token}`);
        // const res = await request(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Owner's posts updated successfully");
        const posts = yield post_model_1.default.find({ "owner._id": userId });
        posts.forEach(post => {
            expect(post.owner.name).toBe('Updated Test User');
        });
    }));
    test('DELETE /post/:id - should delete a post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=post.test.js.map