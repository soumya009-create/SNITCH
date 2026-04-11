import mongoose from "mongoose";
import bcrypt from "bcrypt"
export interface User {
    fullname: string,
    email: string,
    password: string,
    role: string

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
        required: true
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

const UserModel = mongoose.model<User>("User", userSchema)

export default UserModel