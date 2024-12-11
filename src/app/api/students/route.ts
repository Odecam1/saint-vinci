import { NextResponse } from "next/server"
import Student from "@/database/models/Students"
import { connectToDatabase } from "@/utils/connectToDatabase"

export const GET = async () => {
  try {
    await connectToDatabase()
    
    // Récupérer tous les étudiants
    const students = await Student.find()
    
    return NextResponse.json({ students })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Erreur interne du serveur", error: error.message },
        { status: 500 }
      )
    }
    
return NextResponse.json(
      { message: "Erreur lors de la récupération des étudiants" },
      { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    const { firstName, lastName, birthDate, classId, status } = await req.json()

    // Vérifier que toutes les données nécessaires sont présentes
    if (!firstName || !lastName || !birthDate || !classId || !status) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 }
      )
    }

    // Création de l'étudiant
    const newStudent = new Student({
      _id: crypto.randomUUID(),
      firstName,
      lastName,
      birthDate,
      classId,
      status,
    })

    await newStudent.save()

    
return NextResponse.json({ message: "Étudiant ajouté avec succès" })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Erreur interne du serveur", error: error.message },
        { status: 500 }
      )
    }
    
return NextResponse.json(
      { message: "Erreur lors de l'ajout de l'étudiant" },
      { status: 500 }
    )
  }
}
