import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/productschema.js";
import UserModel from "./models/userschema.js";

dotenv.config();

const sampleProducts = [
    {
        name: "Classic White Sneakers",
        description: "Premium leather sneakers with a minimalist design. Perfect for everyday wear with superior comfort and durability.",
        price: { amount: 2499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", alt: "White sneakers front" },
            { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500", alt: "White sneakers side" },
        ],
    },
    {
        name: "Wireless Bluetooth Headphones",
        description: "Noise cancelling over-ear headphones with 30 hour battery life. Deep bass and crystal clear highs.",
        price: { amount: 3999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", alt: "Headphones" },
            { url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500", alt: "Headphones side view" },
        ],
    },
    {
        name: "Leather Crossbody Bag",
        description: "Handcrafted genuine leather crossbody bag with adjustable strap. Compact yet spacious with multiple compartments.",
        price: { amount: 1899, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", alt: "Leather bag" },
        ],
    },
    {
        name: "Analog Wrist Watch",
        description: "Elegant stainless steel watch with sapphire crystal glass. Water resistant up to 50 meters. Japanese quartz movement.",
        price: { amount: 5499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500", alt: "Watch front" },
            { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", alt: "Watch display" },
            { url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500", alt: "Watch on wrist" },
        ],
    },
    {
        name: "Ceramic Coffee Mug Set",
        description: "Set of 4 handmade ceramic mugs in earthy pastel tones. Microwave and dishwasher safe. 350ml capacity each.",
        price: { amount: 999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500", alt: "Coffee mugs" },
        ],
    },
    {
        name: "Portable Bluetooth Speaker",
        description: "Waterproof portable speaker with 360 degree sound. 12 hour playtime with built-in microphone for calls.",
        price: { amount: 2199, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", alt: "Bluetooth speaker" },
            { url: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500", alt: "Speaker outdoor" },
        ],
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ Connected to MongoDB");

        // Find the first user to use as seller
        const user = await UserModel.findOne();
        if (!user) {
            console.log("❌ No user found. Please register a user first, then run this script.");
            process.exit(1);
        }

        console.log(`📦 Seeding products for seller: ${user.email || user._id}`);

        for (const p of sampleProducts) {
            await ProductModel.create({ ...p, seller: user._id });
            console.log(`  ✔ Created: ${p.name}`);
        }

        console.log(`\n🎉 Done! ${sampleProducts.length} products seeded.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

seed();
