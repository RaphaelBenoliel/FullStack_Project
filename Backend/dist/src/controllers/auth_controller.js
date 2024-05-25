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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.user.email;
    const password = req.body.user.password;
    const name = req.body.user.name;
    const phone = req.body.user.phone;
    const address = req.body.user.address;
    const imgUrl = req.body.user.imgUrl;
    if (!email || !password || !name || !phone || !address || !imgUrl) {
        return res.status(400).send("All fields are required");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).send("user already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield user_model_1.default.create({
            email: email,
            password: hashedPassword,
            name: name,
            phone: phone,
            address: address,
            imgUrl: imgUrl,
        });
        return res.status(200).send(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({
        _id: userId
    }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        _id: userId,
        salt: Math.random()
    }, process.env.REFRESH_TOKEN_SECRET);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login");
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return res.status(400).send("missing email or password");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user == null) {
            return res.status(400).send("invalid email");
        }
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(400).send("invalid password");
        }
        console.log("User login...", user._id.toString());
        const { accessToken, refreshToken } = generateTokens(user._id.toString());
        if (user.tokens == null) {
            user.tokens = [refreshToken];
        }
        else {
            user.tokens.push(refreshToken);
        }
        yield user.save();
        return res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) {
        const userDb = yield user_model_1.default.findOne({ '_id': req.params.id });
        userDb.tokens = [];
        yield userDb.save();
        console.log("User logout...");
        return res.sendStatus(200);
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        if (err)
            return res.sendStatus(401);
        try {
            const userDb = yield user_model_1.default.findOne({ '_id': user._id });
            if (!userDb.tokens || !userDb.tokens.includes(refreshToken)) {
                userDb.tokens = [];
                yield userDb.save();
                return res.sendStatus(401);
            }
            else {
                userDb.tokens = userDb.tokens.filter(t => t !== refreshToken);
                yield userDb.save();
                return res.sendStatus(200);
            }
        }
        catch (err) {
            res.sendStatus(401).send(err.message);
        }
    }));
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //extract token from http header
    const authHeader = req.headers['authorization'];
    const refreshTokenOrig = authHeader && authHeader.split(' ')[1];
    if (refreshTokenOrig == null) {
        return res.status(401).send("missing token");
    }
    //verify token
    jsonwebtoken_1.default.verify(refreshTokenOrig, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).send("invalid token");
        }
        try {
            const user = yield user_model_1.default.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(refreshTokenOrig)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    yield user.save();
                }
                return res.status(403).send("invalid token");
            }
            //generate new access token
            const { accessToken, refreshToken } = generateTokens(user._id.toString());
            //update refresh token in db
            user.tokens = user.tokens.filter(token => token != refreshTokenOrig);
            user.tokens.push(refreshToken);
            yield user.save();
            //return new access token & new refresh token
            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }));
});
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const ticket = yield client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload === null || payload === void 0 ? void 0 : payload.email;
        if (email != null) {
            let user = yield user_model_1.default.findOne({ 'email': email });
            if (user == null) {
                user = yield user_model_1.default.create({
                    'email': email,
                    'password': '0',
                    'imgUrl': payload === null || payload === void 0 ? void 0 : payload.picture
                });
            }
            const tokens = generateTokens(user._id.toString());
            res.status(200).send(Object.assign({ email: user.email, _id: user._id, imgUrl: user.imgUrl }, tokens));
        }
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
exports.default = {
    register,
    login,
    logout,
    refresh,
    googleSignIn
};
//# sourceMappingURL=auth_controller.js.map