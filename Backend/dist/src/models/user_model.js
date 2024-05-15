"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
        trim: true, // Trim whitespace from email
        lowercase: true, // Convert email to lowercase
        match: /^\S+@\S+\.\S+$/, // Validate email format
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    tokens: {
        type: [String],
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user_model.js.map