import { NextResponse } from "next/server"
import Class from "@/database/models/Class"
import { connectToDatabase } from "@/utils/connectToDatabase"

export const GET = async () => {
  try {
    await connectToDatabase()
    
    // Récupérer toutes les classes
    const classes = await Class.find()
    
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
