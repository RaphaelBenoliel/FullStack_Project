import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  tokens: string[];
  imgUrl: string;
}

const userSchema = new mongoose.Schema<IUser>({
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
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  tokens: {
    type: [String],
  },
});

export default mongoose.model<IUser>("User", userSchema);
