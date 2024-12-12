import { Student } from "@/database/models/Students"
import Class from "@/database/models/Class"  // Importer le modèle de la classe
import connectToDatabase from "@/utils/connectToDatabase"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  try {
    await connectToDatabase()

    // Initialiser les conditions de recherche
    const searchConditions: { _id?: string } = {}

    const url = new URL(req.url)  // Utilisation correcte de req.url
    const studentId = url.searchParams.get("studentId")  // Récupérer l'ID de l'étudiant à partir des paramètres de l'URL

    // Si un studentId est fourni, l'ajouter aux conditions de recherche
    if (studentId) {
      searchConditions._id = studentId
    }

    // Récupérer les étudiants selon les conditions de recherche
    const students = await Student.find(searchConditions)

    // Rechercher ou créer la classe correspondante (exemple avec niveau et professeur)
    const level = "some level"
    const teacherName = "some teacher"
    let classDoc = await Class.findOne({ level, teacher: teacherName })

    if (!classDoc) {
      // Si la classe n'existe pas, la créer
      classDoc = new Class({ level, teacher: teacherName })
      await classDoc.save()
    }

    return NextResponse.json({ students })  // Retourner les étudiants récupérés
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
    const { firstName, lastName, birthDate, level, teacherName, statut } = await req.json()

    // Vérifier que toutes les données nécessaires sont présentes
    if (!firstName || !lastName || !birthDate || !level || !teacherName) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 },
      )
    }

    // Rechercher ou créer la classe correspondante
    let classDoc = await Class.findOne({ level, teacher: teacherName })

    if (!classDoc) {
      // Si la classe n'existe pas, la créer
      classDoc = new Class({ level, teacher: teacherName })
      await classDoc.save()
    }

    // Création de l'étudiant avec l'ID de la classe
    const newStudent = new Student({
      firstName,
      lastName,
      birthDate,
      level,
      teacherName,
      statut,
      classId: classDoc._id,  // Associe l'étudiant à la classe en ajoutant l'ID de la classe
    })

    await newStudent.save()

    return NextResponse.json({
      message: "Étudiant ajouté avec succès",
      student: newStudent,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Erreur interne du serveur", error: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: "Erreur lors de l'ajout de l'étudiant" },
      { status: 500 },
    )
  }
}