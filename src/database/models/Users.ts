import mongoose, { type Model } from "mongoose"

type IUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: "Directeur" | "Professeur"
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Directeur", "Professeur"],
    required: true,
  },
})

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
