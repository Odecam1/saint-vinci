// src/app/api/years/route.ts
import { connectToDatabase } from "@/utils/connectToDatabase"
import Year from "@/database/models/Year"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

// Récupérer toutes les années
export const GET = async () => {
  try {
    await connectToDatabase()

    const years = await Year.find()

    await mongoose.disconnect()

    return NextResponse.json({ years: years })
  } catch (error) {
    // Gestion des erreurs en vérifiant que l'erreur est une instance de Error
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Erreur lors de la récupération des années.", error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Erreur inconnue du serveur.", error: "Une erreur inconnue est survenue." },
      { status: 500 }
    )
  }
}
