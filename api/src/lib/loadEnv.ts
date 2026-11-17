import dotenv from "dotenv";
import { z } from "zod";

export function loadEnv<S extends z.ZodType>(schema: S): z.infer<S> {
  dotenv.config();
  const result = schema.safeParse(process.env);
  if (!result.success) {
    for (const i of result.error.issues) console.error(` - ${i.path.join(".")}: ${i.message}`);
    process.exit(1);
  }
  return result.data;
}