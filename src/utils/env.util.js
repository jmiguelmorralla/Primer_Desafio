import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

//si env es dev debo usar env.dev
//si env es prod debo usar env.prod
const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const environment = {
    PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET: process.env.SECRET,
  SECRET_JWT: process.env.SECRET_JWT,
  };

export default environment;