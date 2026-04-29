import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { Types } from "mongoose";
export interface User {
    fullname: string,
    email: string,
    password: string,
    role: "buyer" | "seller",
    _id: Types.ObjectId,
    provider: "google" | "email"

}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function () {
            return this.provider !== "google"
        }
    },
    provider: {
        type: String,
        enum: ["google", "email"],
        default: "email",
        required: false
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
})



const UserModel = mongoose.model<User>("User", userSchema)

export default UserModel