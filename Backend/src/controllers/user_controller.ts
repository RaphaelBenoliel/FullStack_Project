import User from "../models/user_model";
import BaseController from "./base_controller";
import { IUser } from "../models/user_model";


class UserController extends BaseController<IUser> {
  constructor() {
    super(User);
  }
  
}

export default new UserController();