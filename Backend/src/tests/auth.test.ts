import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import appInit from '../App';
import User from '../models/user_model';
import dotenv from 'dotenv';

dotenv.config();

let app: Express;
let accessToken = '';
let refreshToken = '';

const user = {
    user: {
        email: 'teszt@gmail.com',
        password: '1234',
        name: 'teszt',
        phone: '123456',
        address: 'teszt',
        imgUrl: 'teszt'
    }
};

beforeAll(async () => {
    app = await appInit();
    console.log('beforeAll');
    await User.deleteMany({ email: user.user.email });
});

afterAll(async () => {
    console.log('afterAll');
    await mongoose.connection.close();
});

describe('Auth tests', () => {
    test('Register /auth/register', async () => {
        const res = await request(app).post('/auth/register').send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.email).toBe(user.user.email);
    });

    test('Login /auth/login', async () => {
        const res = await request(app).post('/auth/login').send({
            email: user.user.email,
            password: user.user.password
        });
        expect(res.statusCode).toBe(200);

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    });

    test('Get /auth/refresh', async () => {
        const res = await request(app).get('/auth/refresh').set('Authorization', `Bearer ${refreshToken}`);
        console.log('Get /auth/refresh response:', res.body);
        expect(res.statusCode).toBe(200);

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    });

    test('Get /auth/refresh after expiration', async () => {
        const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await timeout(6000);  

        let res = await request(app).get('/user').set('Authorization', `Bearer ${accessToken}`);
        console.log('Get /student response after expiration:', res.body);
        expect(res.statusCode).toBe(200);

        res = await request(app).get('/auth/refresh').set('Authorization', `Bearer ${refreshToken}`);
        console.log('Get /auth/refresh after expiration response:', res.body);
        expect(res.statusCode).toBe(200);

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    }, 10000); // Increased timeout to 10 seconds

    test('Refresh token violation', async () => {
        const oldRefreshToken = refreshToken;
        const res = await request(app).get('/auth/refresh').set('Authorization', `Bearer ${oldRefreshToken}`);
        console.log('First Get /auth/refresh violation test response:', res.body);
        expect(res.statusCode).toBe(200);

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res2 = await request(app).get('/auth/refresh').set('Authorization', `Bearer ${oldRefreshToken}`);
        console.log('Second Get /auth/refresh violation test response:', res2.body);
        expect(res2.statusCode).not.toBe(200);
    });
    test('Logout /auth/logout', async () => {
        const userf =  await User.findOne({ email: user.user.email });
        console.log('User:', userf._id.toString());
        const res = await request(app).get(`/auth/logout/${userf._id}`).send({ refreshToken: refreshToken });
        console.log('Post /auth/logout response:', res.body);
        expect(res.statusCode).toBe(200);
    }
    );
});
