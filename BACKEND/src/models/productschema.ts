import mongoose, { Schema, Types, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  seller: Types.ObjectId;
  price: {
    amount: number;
    currency: "INR" | "GBP" | "JPY" | "USD";
  };
  images: {
    url: string;
    alt: string;
  }[];
}

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "GBP", "JPY", "USD"],
        default: "INR",
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true, // 🔥 important
  }
);

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;