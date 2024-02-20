import BaseController from "./base_controller";
import Post, { IPost } from "../models/post_model";

const postController = new BaseController<IPost>(Post);

export default postController