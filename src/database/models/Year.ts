import mongoose from "mongoose"

const YearSchema = new mongoose.Schema({
  year: { type: Number, require: true, unique: true },
  status: { type: String, enum: ["active", "closed"], required: true },
})

const Year = mongoose.models.Year || mongoose.model("Year", YearSchema)

export default Year
