/* eslint-disable no-console */
"use client"

import React, { useEffect, useState } from "react"

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

const ViewStudents = () => {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    // Charger les étudiants depuis l'API ou depuis le dossier data-students
    const fetchStudents = async () => {
      try {
        const response = await fetch("/path-to-stored-data/data-students/your-file.csv")
        const data = await response.json()
        setStudents(data) // Remplir avec les données obtenues
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error)
      }
    }
    fetchStudents()
  }, [])

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Liste des étudiants</h1>
      {students.length > 0 ? (
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
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border px-4 py-2">{student.level}</td>
                <td className="border px-4 py-2">{student.lastName}</td>
                <td className="border px-4 py-2">{student.firstName}</td>
                <td className="border px-4 py-2">{student.birthDate}</td>
                <td className="border px-4 py-2">{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun étudiant trouvé.</p>
      )}
    </div>
  )
}

export default ViewStudents
