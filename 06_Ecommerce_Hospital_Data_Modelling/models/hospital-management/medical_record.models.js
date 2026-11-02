import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
    {
       // Additional fields can be added here
    },
    { timestamps: true }
)

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema)