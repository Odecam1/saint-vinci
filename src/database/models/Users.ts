import { Roles } from "@/utils/statics/roles"
import mongoose, { type Model } from "mongoose"

type IUser = {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: Roles
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
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
