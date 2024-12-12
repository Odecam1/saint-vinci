import Class from "@/database/models/Class"
import connectToDatabase from "@/utils/connectToDatabase"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  try {
    await connectToDatabase()

    // Récupérer le nom du professeur et le niveau depuis les paramètres de la requête
    const url = new URL(req.url)
    const teacherName = url.searchParams.get("teacherName")
    const level = url.searchParams.get("level")

    // Si aucun paramètre n'est fourni, récupérer toutes les classes
    const searchConditions: { teacher?: string; level?: string } = {}

    if (teacherName) {
      searchConditions.teacher = teacherName
    }

    if (level) {
      searchConditions.level = level
    }

    // Récupérer les classes selon les conditions de recherche
    const classes = await Class.find(searchConditions)

    return NextResponse.json({ classes })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Erreur interne du serveur", error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Erreur lors de la récupération des classes" },
      { status: 500 }
    )
  }
}
