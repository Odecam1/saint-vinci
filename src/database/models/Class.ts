import mongoose, { type Model } from "mongoose"

type IClass = {
  teacher: string
  level: string
}

const ClassSchema = new mongoose.Schema<IClass>({
  teacher: { type: String, required: true },
  level: { type: String, required: true },
})

const Class: Model<IClass> =
  mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema)

export default Class
