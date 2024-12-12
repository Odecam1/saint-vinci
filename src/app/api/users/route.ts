import { User } from "@/database/models/Users"
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
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Erreur lors de la récupération des étudiants.",
          error: error.message,
        },
        { status: 500 },
      )
    }

    // Si l'erreur n'est pas une instance d'Error, on retourne un message générique
    return NextResponse.json(
      {
        message: "Erreur inconnue du serveur.",
        error: "Une erreur inconnue est survenue.",
      },
      { status: 500 },
    )
  }
}
