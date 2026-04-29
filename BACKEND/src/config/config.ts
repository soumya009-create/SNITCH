import dotenv from "dotenv"

dotenv.config()

interface Config {
    MONGO_URI: string,
    JWT_SECRET: string,
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    CALLBACK_URL: string,
    IMAGEKIT_PUBLIC_KEY: string,
    IMAGEKIT_PRIVATE_KEY: string,
    IMAGEKIT_URL: string

}

const config: Config = {
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    CALLBACK_URL: process.env.CALLBACK_URL as string,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY as string,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY as string,
    IMAGEKIT_URL: process.env.IMAGEKIT_URL as string
}

export default config