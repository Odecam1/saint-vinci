import mongoose, { Schema, Document, Types } from "mongoose"

// Définir l'interface IStudent avec le bon type pour `classId`
interface IStudent extends Document {
  firstName: string
  lastName: string
  birthDate: string
  statut: string
  classId: Types.ObjectId  // Utiliser Types.ObjectId pour les ObjectId
}

// Définir le schéma de l'étudiant avec une référence à la classe
const StudentSchema = new Schema<IStudent>({
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
    default: "enrolled",
  },
  classId: { 
    type: Schema.Types.ObjectId, 
    ref: "Class", 
    required: true 
  },
})

// Exporter le modèle avec l'interface correctement typée
const Student = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)

export { Student }
