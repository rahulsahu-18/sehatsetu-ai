import { createApp } from "./app.js";
import connectDB from "./config/db.config.js";
import { env } from "./env.js";

const app = createApp();

const server = app.listen(env.API_PORT, async () => {
  await connectDB();
  console.log(`API server listening on port ${env.API_PORT}`);
});

export default server;