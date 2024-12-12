import { NextApiRequest, NextApiResponse } from "next"
import { Student } from "@/database/models/Students"
import Class from "@/database/models/Class"
import connectToDatabase from "@/utils/connectToDatabase"

export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { studentId } = req.query  // Utiliser `studentId` depuis les paramètres de route

    if (!studentId || Array.isArray(studentId)) {
      return res.status(400).json({ message: "L'ID de l'étudiant est manquant." })
    }

    const { statut, firstName, lastName, birthDate, level, teacherName } = req.body

    if (!statut && !firstName && !lastName && !birthDate && !level && !teacherName) {
      return res.status(400).json({ message: "Aucune donnée à mettre à jour." })
    }

    await connectToDatabase()

    const student = await Student.findById(studentId)

    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé." })
    }

    // Mise à jour des informations de l'étudiant
    if (statut) { student.statut = statut }

    if (firstName) { student.firstName = firstName }

    if (lastName) { student.lastName = lastName }

    if (birthDate) { student.birthDate = birthDate }

    if (level && teacherName) {
      let classDoc = await Class.findOne({ level, teacher: teacherName })

      if (!classDoc) {
        classDoc = new Class({ level, teacher: teacherName })
        await classDoc.save()
      }

      student.classId = classDoc._id
    }

    await student.save()

    return res.status(200).json({
      message: "Informations de l'étudiant mises à jour avec succès.",
      student,
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Erreur interne du serveur", error: error.message })
    }

    
return res.status(500).json({ message: "Erreur lors de la mise à jour de l'étudiant" })
  }
}
