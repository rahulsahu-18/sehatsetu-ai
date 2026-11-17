import express, { type Request, type Response } from "express";

const appointmentRouter: express.Router = express.Router();

appointmentRouter.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Appointments route is ready.",
    appointments: [],
  });
});

export default appointmentRouter;