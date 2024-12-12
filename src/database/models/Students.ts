import mongoose, { type Model } from "mongoose"

// Définition du type pour un étudiant
type IStudent = {
  level: string
  firstName: string
  lastName: string
  birthDate: string
  teacherName: string
}

// Création du schéma Mongoose
const StudentSchema = new mongoose.Schema<IStudent>({
  level: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String, // Tu peux aussi utiliser un type `Date` si tu préfères
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
})

// Création du modèle Mongoose pour Student
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)
