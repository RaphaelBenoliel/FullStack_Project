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
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const App_1 = __importDefault(require("../App"));
const user_model_1 = __importDefault(require("../models/user_model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let app;
const testUser = {
    email: 'testuser@gmail.com',
    password: 'password',
    name: 'Test User',
    phone: '1234567890',
    address: 'Test Address',
    imgUrl: 'http://example.com/image.png'
};
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log('beforeAll');
    yield user_model_1.default.deleteMany({ email: testUser.email });
    // Create a user to test with
    yield (0, supertest_1.default)(app).post('/auth/register').send({ user: testUser });
    // console.log(res.body);
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
describe('File Upload API tests', () => {
    test('POST /upload - should upload a file', () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, 'test_image.png');
        const res = yield (0, supertest_1.default)(app)
            .post('/file/upload')
            .set('Authorization', `Bearer ${token}`)
            .attach('file', filePath);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('url');
        expect(res.body.url).toMatch(/uploads\/\d+\.jpg$/);
    }));
    test('POST /upload - should return 400 if no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/file/upload')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'No file uploaded.');
    }));
});
//# sourceMappingURL=file.test.js.map