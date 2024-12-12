import Year from "@/database/models/Year"
import connectToDatabase from "@/utils/connectToDatabase"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    // Connexion à la base de données
    await connectToDatabase()

    // Trouver l'année active
    const activeYear = await Year.findOne({ status: "active" })

    // Déconnexion de la base de données
    await mongoose.disconnect()

    // Vérifier si une année active a été trouvée
    if (!activeYear) {
      return NextResponse.json(
        { message: "Aucune année active trouvée." },
        { status: 404 },
      )
    }

    // Retourner l'année active
    return NextResponse.json({ activeYear })
  } catch (error) {
    // Gestion des erreurs
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Erreur lors de la récupération de l'année active.",
          error: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        message: "Erreur inconnue du serveur.",
        error: "Une erreur inconnue est survenue.",
      },
      { status: 500 },
    )
  }
}
