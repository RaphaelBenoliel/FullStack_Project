import { Request, Response } from "express";
import User  from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const register = async (req: Request, res: Response) => {
    console.log(req.body);
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
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send("user already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            name: name,
            phone: phone,
            address: address,
            imgUrl: imgUrl,
            
        });

        return res.status(200).send(newUser);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}


const generateTokens = (userId: string): { accessToken: string, refreshToken: string } => {
    const accessToken = jwt.sign(
        { _id: userId },
        process.env.TOKEN_SECRET || "defaultSecret", // Use default secret if process.env.TOKEN_SECRET is undefined
        { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
        { _id: userId, salt: Math.random() },
        process.env.REFRESH_TOKEN_SECRET || "defaultRefreshSecret" // Use default secret if process.env.REFRESH_TOKEN_SECRET is undefined
    );

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

const login = async (req: Request, res: Response) => {
    console.log("login");

    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send("missing email or password");
    }

    try {
        const user = await User.findOne({ email: email });

        if (user == null) {
            return res.status(400).send("invalid email");
        }
        
        const valid = await bcrypt.compare(password, user.password);
        console.log(valid);
        if (!valid) {
            return res.status(400).send("invalid password");
        }

        const { accessToken, refreshToken } = generateTokens(user._id.toString());

        if (user.tokens == null) {
            user.tokens = [refreshToken];
        } else {
            user.tokens.push(refreshToken);
        }
        await user.save();
        return res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}

const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user: { '_id': string }) => {
        console.log(err);
        if (err) return res.sendStatus(401);
        try {
            const userDb = await User.findOne({ '_id': user._id });
            if (!userDb.tokens || !userDb.tokens.includes(refreshToken)) {
                userDb.tokens = [];
                await userDb.save();
                return res.sendStatus(401);
            } else {
                userDb.tokens = userDb.tokens.filter(t => t !== refreshToken);
                await userDb.save();
                return res.sendStatus(200);
            }
        } catch (err) {
            res.sendStatus(401).send(err.message);
        }
    });
}

const refresh = async (req: Request, res: Response) => {
    //extract token from http header
    const authHeader = req.headers['authorization'];
    const refreshTokenOrig = authHeader && authHeader.split(' ')[1];

    if (refreshTokenOrig == null) {
        return res.status(401).send("missing token");
    }

    //verify token
    jwt.verify(refreshTokenOrig, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo: { _id: string }) => {
        if (err) {
            return res.status(403).send("invalid token");
        }

        try {
            const user = await User.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(refreshTokenOrig)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send("invalid token");
            }

            //generate new access token
            const { accessToken, refreshToken } = generateTokens(user._id.toString());

            //update refresh token in db
            user.tokens = user.tokens.filter(token => token != refreshTokenOrig);
            user.tokens.push(refreshToken);
            await user.save();

            //return new access token & new refresh token
            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    });
}
const googleSignIn = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload?.email;
        if (email != null) {
            let user = await User.findOne({ 'email': email });
            if (user == null) {
                user = await User.create(
                    {
                        'email': email,
                        'password': '0',
                        'imgUrl': payload?.picture
                    });
            }
            const tokens = await generateTokens(user._id.toString())
            res.status(200).send(
                {
                    email: user.email,
                    _id: user._id,
                    imgUrl: user.imgUrl,
                    ...tokens
                })
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }

}

export default {
    register,
    login,
    logout,
    refresh,
    googleSignIn
}