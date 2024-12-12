/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next"
import Student from "@/database/models/Students"
import connectToDatabase from "@/utils/connectToDatabase"

// Handler pour publier les étudiants
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Connectez-vous à la base de données
      await connectToDatabase()

      // Récupérer les étudiants depuis le body
      const students = req.body

      if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: "Le body doit contenir un tableau d'étudiants." })
      }

      // Insérer les étudiants dans la base de données
      await Student.insertMany(students)

      res.status(200).json({ message: "Étudiants publiés avec succès." })
    } catch (error) {
      console.error("Erreur lors de la publication des étudiants:", error)
      res.status(500).json({ message: "Erreur interne du serveur." })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).json({ message: `Méthode ${req.method} non autorisée.` })
  }
}
