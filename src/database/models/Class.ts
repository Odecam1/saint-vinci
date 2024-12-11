import mongoose from "mongoose"

// Schéma pour les classes
const ClassSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  teacher: { type: String, required: true },
  level: { type: String, required: true },
})

// Création du modèle pour les classes
const Class = mongoose.models.Class || mongoose.model("Class", ClassSchema)

export default Class
