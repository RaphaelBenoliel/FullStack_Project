import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post_model";


class BaseController<ModelType> {
    itemModel: mongoose.Model<ModelType>;
    constructor(itemModel: mongoose.Model<ModelType>) {
        this.itemModel = itemModel;
    }
    async get(req: Request, res: Response) {
        console.log("get");
        try {
            if (req.query.name) {
                const item = await this.itemModel.find({ name: req.query.name });
                res.status(200).send(item);
            } else {
                const item = await this.itemModel.find();
                res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
    async getUser(req: Request, res: Response) {
        try {
          const user = await this.itemModel.findOne({ tokens: req.params.token });
          if (!user) {
            return res.status(404).send("token user not found");
          } else {
            return res.status(200).send(user);
          }
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      }

    async getById(req: Request, res: Response) {
        console.log("getById");
        try {
            const item = await this.itemModel.findById(req.params.id);
            if (!item) {
                return res.status(404).send("not found");
            } else {
                return res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async post(req: Request, res: Response) {
        console.log("post");
        try {
            const item = await this.itemModel.create(req.body);
            res.status(201).send(item);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
    
    async put(req: Request, res: Response) {
        console.log("put");
        try {
            const item = await this.itemModel.findByIdAndUpdate(req.params.id, req.body );
            // console.log("item: ", item);
            if (!item) {
                return res.status(404).send("not found");
            } else {
                return res.status(200).send(item);
            }
            
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async remove(req: Request, res: Response) {
        console.log("delete");
        try {
            await this.itemModel.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
    async updateOwnerPosts(req: Request, res: Response) {

        const ownerId = req.body.owner; // owner id

        try {
            // Find all posts belonging to the owner
            const posts = await Post.find({ "owner._id": ownerId });

            // Update each post
            for (const post of posts) {
                await Post.updateOne({ _id: post._id }, { $set: req.body });
            }

            res.status(200).json({ message: "Owner's posts updated successfully" });
        } catch (error) {
            console.error("Error updating owner's posts:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default BaseController;