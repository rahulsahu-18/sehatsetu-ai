import mongoose, { Schema, type InferSchemaType } from "mongoose";

const appointmentSchema = new Schema(
  {
    patientName: { type: String, required: true, trim: true },
    doctorName: { type: String, required: true, trim: true },
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "confirmed", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  },
);

export type AppointmentDocument = InferSchemaType<typeof appointmentSchema>;

const AppointmentModel =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;