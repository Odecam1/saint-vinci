"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import apiRoutes from "@/utils/statics/apiRoutes"
import Papa from "papaparse"
import React, { useState } from "react"
import { FaSpinner } from "react-icons/fa"

type StudentImport = {
  level: string
  firstName: string
  lastName: string
  birthDate: string
  teacherName: string
}

type StudentCSV = {
  Niveau: string
  "Prénom Élève": string
  "Nom Élève": string
  "Date de Naissance": string
  "Nom Professeur": string
}

const ListStudents = () => {
  const [msg, setMsg] = useState("")
  const [students, setStudents] = useState<StudentImport[]>([])
  const [file, setFile] = useState<File | null>()
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]

    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleParseCSV = () => {
    if (file) {
      Papa.parse<StudentCSV>(file, {
        complete: (result) => {
          const studentsData: StudentImport[] = result.data.map((row) => ({
            level: row["Niveau"],
            firstName: row["Prénom Élève"],
            lastName: row["Nom Élève"],
            birthDate: row["Date de Naissance"],
            teacherName: row["Nom Professeur"],
          }))

          setStudents(studentsData)
        },
        header: true,
        skipEmptyLines: true,
      })
    }
  }

  const handlePublish = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(apiRoutes.students.multiple(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(students),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) // Essayer d'extraire les erreurs JSON si possible
        console.error(
          "Erreur lors de l'enregistrement des étudiants :",
          errorData.message || "Réponse vide",
        )

        return
      }

      setMsg("Le document à bien été chargé")

      const data = await response.json()
      console.log("Étudiants enregistrés avec succès :", data)
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des étudiants :", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Ajouter la liste des élèves</h1>

      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="w-full rounded border p-2"
        />
        <Button
          className="mt-4 w-36"
          onClick={handleParseCSV}
          variant="default"
        >
          Charger le fichier
        </Button>
      </div>

      {students.length > 0 && (
        <div>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 ">
            {msg ? <p className="font-bold text-green-500">{msg}</p> : null}
            <Button
              className={cn(
                "mt-4 w-fit",
                isLoading ? "cursor-not-allowed opacity-50" : "",
              )}
              disabled={isLoading}
              onClick={handlePublish}
              variant="default"
            >
              <FaSpinner className={isLoading ? "animate-spin" : "hidden"} />
              Publier les étudiants
            </Button>
          </div>

          <h2 className="mb-2 text-xl font-semibold">Liste des étudiants</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Niveau</th>
                <th className="border px-4 py-2">Nom</th>
                <th className="border px-4 py-2">Prénom</th>
                <th className="border px-4 py-2">Date de naissance</th>
                <th className="border px-4 py-2">Nom du Professeur</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{student.level}</td>
                  <td className="border px-4 py-2">{student.lastName}</td>
                  <td className="border px-4 py-2">{student.firstName}</td>
                  <td className="border px-4 py-2">{student.birthDate}</td>
                  <td className="border px-4 py-2">{student.teacherName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListStudents
