import mongoose from "mongoose"

// Schéma pour les années
const YearSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ID de l'année
  status: { type: String, enum: ["active", "closed"], required: true }, // Statut de l'année
})

// Création du modèle pour les années
const Year = mongoose.model("Year", YearSchema)

export default Year
