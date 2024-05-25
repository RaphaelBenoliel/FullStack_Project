import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import appInit from '../App';
import User from '../models/user_model';
import dotenv from 'dotenv';

dotenv.config();

let app: Express;

const testUser = {
    email: 'testuser@gmail.com',
    password: 'password',
    name: 'Test User',
    phone: '1234567890',
    address: 'Test Address',
    imgUrl: 'http://example.com/image.png'
};

let userId: string;
let token: string;

beforeAll(async () => {
    app = await appInit();
    console.log('beforeAll');
    await User.deleteMany({email: testUser.email });

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

describe('User API tests', () => {
    test('GET /user - should return all users', async () => {
        const res = await request(app).get('/user').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('GET /user/:token - should return a user', async () => {
        const res = await request(app).get(`/user/${token}`).set('Authorization', `Bearer ${token}`);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', userId);
    });

    test('PUT /user/:id - should update a user', async () => {
        const updatedData = { ...testUser, name: 'Updated Test User' };
       await request(app).put(`/user/${userId}`).send(updatedData).set('Authorization', `Bearer ${token}`);
        const res = await request(app).get(`/user/${token}`).set('Authorization', `Bearer ${token}`);
        // console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'Updated Test User');
    });

    test('PUT /user/:id - should return 404 for non-existing user', async () => {
        const id   = '664d3aa2b2dabddaee6b8bd6';
        const res = await request(app).put(`/user/${id}`).send(testUser).set('Authorization', `Bearer ${token}`);   
        expect(res.statusCode).toBe(404);
    });
});
