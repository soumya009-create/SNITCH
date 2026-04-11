import mongoose from "mongoose"
import config from "./config.js"

export async function connection() {
    await mongoose.connect(config.MONGO_URI).then(() => {
        console.log("database is connected to server")
    }).catch((err) => {
        console.log(err)
    })
}