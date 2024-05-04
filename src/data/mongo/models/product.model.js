import { Schema, Types, model } from "mongoose";

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
      index: true,
    },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    user_id: { type: Types.ObjectId, ref: "users", index: true, required: true}
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("user_id", "email photo -_id")
}
)

schema.pre("findOne", function () {
  this.populate("user_id", "email")
  }
)

const Product = model(collection, schema);

export default Product;
