import mongoose, { Schema,type Model } from "mongoose"

type IStudent = {
  firstName: string
  lastName: string
  birthDate: string
  statut: string
  classId: Schema.Types.ObjectId
}

const StudentSchema = new mongoose.Schema<IStudent>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  statut: { 
      type: String, 
      required: true, 
      enum: ["enrolled", "repeating"],
      default: "enrolled"
    },
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
})

export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)

