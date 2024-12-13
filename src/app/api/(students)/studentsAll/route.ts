import Class from "@/database/models/Class"
import { Student } from "@/database/models/Students"
import connectToDatabase from "@/utils/connectToDatabase"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    await connectToDatabase()

    const students = await Student.find().populate({
      path: "classId",
      select: "teacher level",
    })

    return NextResponse.json({ students })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Erreur interne du serveur", error: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: "Erreur lors de la récupération des étudiants" },
      { status: 500 },
    )
  }
}

export const POST = async (req: Request) => {
  try {
    const studentsImport: {
      level: string
      firstName: string
      lastName: string
      birthDate: string
      teacherName: string
    }[] = await req.json()

    if (!Array.isArray(studentsImport) || studentsImport.length === 0) {
      return NextResponse.json(
        { message: "Le tableau des étudiants est vide ou invalide." },
        { status: 400 },
      )
    }

    for (const student of studentsImport) {
      const { level, firstName, lastName, birthDate, teacherName } = student

      if (!firstName || !lastName || !birthDate || !teacherName) {
        return NextResponse.json(
          {
            message:
              "Chaque étudiant doit contenir les champs requis : level, firstName, lastName, birthDate, teacherName.",
          },
          { status: 400 },
        )
      }

      let classStudent = await Class.findOne({
        level,
        teacher: teacherName,
      })

      if (!classStudent) {
        classStudent = await Class.create({ teacher: teacherName, level })
        classStudent.save()
      }

      const newStudents = new Student({
        firstName,
        lastName,
        birthDate,
        classId: classStudent._id,
      })

      newStudents.save()
    }

    return NextResponse.json(
      { message: "Étudiants ajoutés avec succès." },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de l'ajout des étudiants." },
      { status: 500 },
    )
  }
}
