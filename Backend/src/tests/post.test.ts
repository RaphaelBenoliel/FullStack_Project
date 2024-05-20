// import request from "supertest";
// import appInit from "../App";
// import mongoose from "mongoose";
// import Post from "../models/post_model";
// import { Express } from "express";
// import User from "../models/user_model";

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

import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import appInit from '../App';
import Post from '../models/post_model';
import User from '../models/user_model';
import dotenv from 'dotenv';

dotenv.config();

let app: Express;

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

let userId: string;
let token: string;
let postId: string;

beforeAll(async () => {
    app = await appInit();
    console.log('beforeAll');
    await User.deleteMany({ email: testUser.name });
    await Post.deleteMany({commentUrl: testPost.commentUrl});

    // Create a user to test with
    const res = await request(app).post('/auth/register').send({ user: testUser });
    console.log(res.body);
    userId = res.body._id;

    const loginRes = await request(app).post('/auth/login').send({
        email: testUser.email,
        password: testUser.password
    });
    token = loginRes.body.refreshToken;
});

afterAll(async () => {
    console.log('afterAll');
    await mongoose.connection.close();
});

describe('Post API tests', () => {
    test('POST /post - should create a new post', async () => {
        const res = await request(app).post('/post').send({
            ...testPost,
            owner: {
                _id: userId,
                name: testUser.name,
                imgUrl: testUser.imgUrl
            }
        }).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        postId = res.body._id;
    });

    test('GET /post - should return all posts', async () => {
        const res = await request(app).get('/post').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /post/:id - should return a post by ID', async () => {
        const res = await request(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', postId);
    });

    test('PUT /post/:id - should update a post', async () => {
        const updatedData = {
            comment: 'Updated comment'
        };

        await request(app).put(`/post/${postId}`).send(updatedData).set('Authorization', `Bearer ${token}`);
        const res = await request(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('comment', 'Updated comment');
    });

    test('PUT /post - should update all posts by owner', async () => {
        
        const res = await request(app).put('/post').send(userId).set('Authorization', `Bearer ${token}`);
        // const res = await request(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Owner's posts updated successfully");

        const posts = await Post.find({ "owner._id": userId });
        posts.forEach(post => {
            expect(post.owner.name).toBe('Updated Test User');
        });
    });

    test('DELETE /post/:id - should delete a post', async () => {
        const res = await request(app).delete(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
});
