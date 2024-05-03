import { Schema, model, Types } from "mongoose";


const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, index: true, ref: "users" },
    product_id: {
      type: Types.ObjectId, required: true, index: true, ref: "products" },
    quantity: { type: Number, required: true, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  {
    timestamps: true,
  }

);

schema.pre("find", function() {
  this.populate("user_id")
  // agregar selectores

})

schema.pre("find", function() {
  this.populate("product_id")
  // agregar selectores

})

const Cart = model(collection, schema);

export default Cart;
