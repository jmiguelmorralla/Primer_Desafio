import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
    },
    category: {
      type: String,
      default: "plastico",
      enum: ["plastico", "madera", "metal", "vidrio", "tela"],
    },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);

export default Product;
