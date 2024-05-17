import BaseController from "./base_controller";
import Post, { IPost } from "../models/post_model";
import { Request, Response } from "express";
// import mongoose from "mongoose";

class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

    async post(req: Request, res: Response) {
        console.log("reqqqqqq" , req.body);
        super.post(req, res);
    }
   


}

export default new PostController();