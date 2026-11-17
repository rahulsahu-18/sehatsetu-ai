import { z } from "zod";
import { loadEnv } from "./lib/loadEnv.js";

const schema = z.object({
  API_PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().default("mongodb://localhost:27017/clinic-voice"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  LIVEKIT_URL: z.string().default("ws://localhost:7880"),
  LIVEKIT_API_KEY: z.string().default("devkey"),
  LIVEKIT_API_SECRET: z.string().default("devsecret"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_SECREAT:z.string().default("")
});

export const env = loadEnv(schema);
