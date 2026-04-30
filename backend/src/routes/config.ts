import "dotenv/config";

const mongoUri = process.env.mongoDb_Url;
if (!mongoUri) {
  throw new Error("Environment variable mongoDb_Url is not defined");
}
export const MONGODB_URI: string = mongoUri;

const jwtSecret = process.env.JWT_Secret;
if (!jwtSecret) {
  throw new Error("Environment variable JWT_Secret is not defined");
}
export const JWT_Secret: string = jwtSecret;
