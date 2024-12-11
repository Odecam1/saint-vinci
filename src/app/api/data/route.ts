import { User } from "@/model/Users"
import { connectToDatabase } from "@/utils/conecteDatabase"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    await connectToDatabase()

    const newUser = new User({
      username: "a",
      email: "email@example.com",
      password: "oihgrf^ze^jgb",
    })

    await newUser.save()

    const users = await User.find({ username: "a" })

    await mongoose.disconnect()

    return NextResponse.json({ message: "Ça marche", users, newUser })
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 },
    )
  }
}
