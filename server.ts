import express from "express";
import dotenv from "dotenv";
import { Application } from "express";
import ServerIndex from "./controller/ServerIndex";
import { unCoughtErrorHandler } from "./middlewares/error/errorHandler";
import RedisManager from "./data/caching/RedisManager";
import RedisMiddleware from "./middlewares/redis/RedisMiddleware";
//Environment Variables
dotenv.config({ path: "./config/env/config.env" });

// Creating our server
const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

//error-handler middleware
app.use(unCoughtErrorHandler);

// Init Redis Caching
export const redis = new RedisManager();

// // Redis cache middleware
export const redisCacheMiddleware = new RedisMiddleware(redis.client);

const server: ServerIndex = new ServerIndex(app);

export default app.listen(PORT, () => {
  console.log(
    `server is running http://localhost:${PORT} : ${process.env.NODE_ENV}`
  );
});
