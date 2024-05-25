"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const App_1 = __importDefault(require("../App"));
const user_model_1 = __importDefault(require("../models/user_model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let app;
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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log('beforeAll');
    yield user_model_1.default.deleteMany({ email: user.user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('afterAll');
    yield mongoose_1.default.connection.close();
}));
describe('Auth tests', () => {
    test('Register /auth/register', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/auth/register').send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.email).toBe(user.user.email);
    }));
    test('Login /auth/login', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/auth/login').send({
            email: user.user.email,
            password: user.user.password
        });
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    }));
    test('Get /auth/refresh', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/auth/refresh').set('Authorization', `Bearer ${refreshToken}`);
        console.log('Get /auth/refresh response:', res.body);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    }));
    test('Get /auth/refresh after expiration', () => __awaiter(void 0, void 0, void 0, function* () {
        const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        yield timeout(6000);
        let res = yield (0, supertest_1.default)(app).get('/user').set('Authorization', `Bearer ${accessToken}`);
        console.log('Get /student response after expiration:', res.body);
        expect(res.statusCode).toBe(200);
        res = yield (0, supertest_1.default)(app).get('/auth/refresh').set('Authorization', `Bearer ${refreshToken}`);
        console.log('Get /auth/refresh after expiration response:', res.body);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    }), 10000); // Increased timeout to 10 seconds
    test('Refresh token violation', () => __awaiter(void 0, void 0, void 0, function* () {
        const oldRefreshToken = refreshToken;
        const res = yield (0, supertest_1.default)(app).get('/auth/refresh').set('Authorization', `Bearer ${oldRefreshToken}`);
        console.log('First Get /auth/refresh violation test response:', res.body);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).get('/auth/refresh').set('Authorization', `Bearer ${oldRefreshToken}`);
        console.log('Second Get /auth/refresh violation test response:', res2.body);
        expect(res2.statusCode).not.toBe(200);
    }));
    test('Logout /auth/logout', () => __awaiter(void 0, void 0, void 0, function* () {
        const userf = yield user_model_1.default.findOne({ email: user.user.email });
        console.log('User:', userf._id.toString());
        const res = yield (0, supertest_1.default)(app).get(`/auth/logout/${userf._id}`).send({ refreshToken: refreshToken });
        console.log('Post /auth/logout response:', res.body);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=auth.test.js.map