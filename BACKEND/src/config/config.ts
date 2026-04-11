import dotenv from "dotenv"

dotenv.config()

interface Config {
    MONGO_URI: string,
    JWT_SECRET: string
}

const config: Config = {
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string
}

export default config