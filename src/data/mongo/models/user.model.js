import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    photo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueick0BA5tVSQJFjPJ49GPHAl30OzLnSjvRT_rpGv784YF5bCSHJ7V_qFVQ3aDkM2qlQ&usqp=CAU",
    },
    first_name: { type: String, required: true},
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1],
      index: true,
    },
    verify: { type: Boolean, default: false },
    verifyCode: {type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);

export default User;
