import User from "@/database/models/Users"
import connectToDatabase from "@/utils/connectToDatabase"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    await connectToDatabase()

    const users = await User.find()

    await mongoose.disconnect()

    return NextResponse.json({ users: users })
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 },
    )
  }
}
