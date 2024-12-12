import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  classId: { type: String, ref: "Class", required: true },
  status: {
    type: String,
    enum: ["enrolled", "repeating", "new"],
    required: true,
  },
})

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema)

export default Student
