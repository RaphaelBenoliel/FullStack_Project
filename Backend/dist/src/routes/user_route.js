"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
// import authMiddleware from "../common/auth_middleware";
// router.get("/", authMiddleware, studentController.get.bind(studentController));
router.post("/", user_controller_1.default.getUser.bind(user_controller_1.default));
router.put("/:id", user_controller_1.default.put.bind(user_controller_1.default));
// router.get("/:id", authMiddleware, studentController.getById.bind(studentController));
// router.post("/", authMiddleware, studentController.post.bind(studentController));
// router.put("/:id", authMiddleware, studentController.put.bind(studentController));
// router.delete("/:id", authMiddleware, studentController.remove.bind(studentController));
exports.default = router;
//# sourceMappingURL=user_route.js.map