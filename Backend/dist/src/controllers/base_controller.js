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
const post_model_1 = __importDefault(require("../models/post_model"));
class BaseController {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get");
            try {
                if (req.query.name) {
                    const item = yield this.itemModel.find({ name: req.query.name });
                    res.status(200).send(item);
                }
                else {
                    const item = yield this.itemModel.find();
                    res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.itemModel.findOne({ tokens: req.params.token });
                if (!user) {
                    return res.status(404).send("token user not found");
                }
                else {
                    return res.status(200).send(user);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getById");
            try {
                const item = yield this.itemModel.findById(req.params.id);
                if (!item) {
                    return res.status(404).send("not found");
                }
                else {
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("post");
            try {
                const item = yield this.itemModel.create(req.body);
                res.status(201).send(item);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put");
            try {
                const item = yield this.itemModel.findByIdAndUpdate(req.params.id, req.body);
                // console.log("item: ", item);
                if (!item) {
                    return res.status(404).send("not found");
                }
                else {
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("delete");
            try {
                yield this.itemModel.findByIdAndDelete(req.params.id);
                return res.status(200).send();
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    updateOwnerPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerId = req.body.owner; // owner id
            try {
                // Find all posts belonging to the owner
                const posts = yield post_model_1.default.find({ "owner._id": ownerId });
                // Update each post
                for (const post of posts) {
                    yield post_model_1.default.updateOne({ _id: post._id }, { $set: req.body });
                }
                res.status(200).json({ message: "Owner's posts updated successfully" });
            }
            catch (error) {
                console.error("Error updating owner's posts:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map