import request from 'supertest';
import path from 'path';
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

let token: string;

beforeAll(async () => {
    app = await appInit();
    console.log('beforeAll');
    await User.deleteMany({ email: testUser.email });

    // Create a user to test with
    await request(app).post('/auth/register').send({ user: testUser });
    // console.log(res.body);

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

describe('File Upload API tests', () => {
    test('POST /upload - should upload a file', async () => {
        const filePath = path.join(__dirname, 'test_image.png');
        const res = await request(app)
            .post('/file/upload')
            .set('Authorization', `Bearer ${token}`)
            .attach('file', filePath);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('url');
        expect(res.body.url).toMatch(/uploads\/\d+\.jpg$/);
    });

    test('POST /upload - should return 400 if no file is uploaded', async () => {
        const res = await request(app)
            .post('/file/upload')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'No file uploaded.');
    });
});
