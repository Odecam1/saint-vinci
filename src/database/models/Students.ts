import mongoose from "mongoose"

// Schéma pour les étudiants
const StudentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  classId: { type: String, ref: "Class", required: true }, // Référence à la classe
  status: { type: String, enum: ["enrolled", "repeating", "new"], required: true },
})

// Création du modèle pour les étudiants
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema)

export default Student
