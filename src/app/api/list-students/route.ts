/* eslint-disable no-console */
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import path from "path"

// Méthode POST pour enregistrer les étudiants
export async function POST(req: Request) {
  try {
    const students = req.body
    console.log("Données reçues :", students)

    // Définir le répertoire où vous souhaitez enregistrer le fichier
    const dir = path.join(process.cwd(), "database", "list-students")

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const filePath = path.join(dir, "listStudents.json")

    fs.writeFileSync(filePath, JSON.stringify(students, null, 2))

       
return NextResponse.json(
              { message: "Étudiants enregistrés avec succès." },
              { status: 200 },
            )
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des étudiants:", error)

    
return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 })
  }
}

// Méthode GET pour récupérer les étudiants
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), "database", "list-students", "listStudents.json")
    
    // Vérifie si le fichier existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Fichier des étudiants non trouvé." })
    }

    const fileData = fs.readFileSync(filePath, "utf-8")
    const students = JSON.parse(fileData)
    res.status(200).json(students)
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error)

    
return res.status(500).json({ message: "Erreur interne du serveur lors de la récupération des étudiants." })
  }
}
