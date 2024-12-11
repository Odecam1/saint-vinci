/* eslint-disable no-console */
"use client"

import { Button } from "@/components/ui/button"
import Papa from "papaparse"
import React, { useState } from "react"

type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  level: string
  status: string
  classId: string
  name: string
}

const ListStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [file, setFile] = useState<File | null>(null)

  // Fonction pour gérer l'upload du fichier CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]

    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  // Fonction pour parser le fichier CSV
  const handleParseCSV = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log(result.data) // Affiche les données du CSV dans la console
          // Convertir le CSV en un tableau d'objets Student
          const studentsData = result.data.map((row: any) => ({
            _id: crypto.randomUUID(), // Crée un ID unique pour chaque étudiant
            level: row["Niveau"],
            firstName: row["Prénom Élève"],
            lastName: row["Nom Élève"],
            birthDate: row["Date de Naissance"],
            status: "enrolled", // Statut par défaut
            classId: "", // A rajouter si besoin
            name: `${row["Nom Professeur"]}`, // Exemple de format de nom
          }))
          setStudents(studentsData)
        },
        header: true,
        skipEmptyLines: true,
      })
    }
  }

  // Fonction pour publier les étudiants dans la base de données
  const handlePublish = async () => {
    try {
      const response = await fetch("/api/students/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(students),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Élèves publiés avec succès :", data)
        alert("Les élèves ont été publiés avec succès.")
      } else {
        console.error("Erreur lors de la publication des étudiants.")
      }
    } catch (error) {
      console.error("Erreur lors de la publication :", error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Ajouter la liste des élèves</h1>

      {/* Formulaire d'upload du fichier CSV */}
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

      {/* Tableau d'affichage des données CSV */}
      {students.length > 0 && (
        <div>
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
                  <td className="border px-4 py-2">{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-center">
            <Button
                className="w-fit py-4 text-xl"
                onClick={handlePublish}
                variant="default"
            >
                Publier les étudiants
            </Button>
            </div>
        </div>
      )}
    </div>
  )
}

export default ListStudents
