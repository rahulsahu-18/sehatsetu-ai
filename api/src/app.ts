import cors from "cors";
import express, { type Express } from "express";
import { env } from "./env.js";
import appointmentRouter from "./routes/appointment.routes.js";
import healthRouter from "./routes/helth.routes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(healthRouter);
  app.use('/api/auth',userRouter);
  app.use("/appointments", appointmentRouter);

  app.get("/", (_req, res) => {
    res.status(200).json({ service: "clinic-voice-api", status: "ok" });
  });

  return app;
}

export default createApp;