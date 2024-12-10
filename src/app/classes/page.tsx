"use client"

import { faker } from "@faker-js/faker"
import React, { useEffect, useState } from "react"

// Définition des types
type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  level: string
  status: string
}

type Class = {
  id: string
  level: string
  students: Student[]
}

// Génération des niveaux scolaires
const levels = ["PS", "MS", "GS", "CP", "CE1", "CE2", "CM1", "CM2"]

// Fonction pour générer une classe avec des étudiants
const generateClass = (level: string): Class => {
  const studentCount = faker.number.int({ min: 15, max: 25 }) // Entre 15 et 25 élèves
  const students = Array.from({ length: studentCount }, () => ({
    _id: crypto.randomUUID(), // Génère un UUID unique pour chaque étudiant
    firstName: faker.person.firstName(), // Génère un prénom
    lastName: faker.person.lastName(), // Génère un nom de famille
    birthDate: faker.date.between({ from: "2010-01-01", to: "2015-01-01" }).toISOString().split("T")[0], // Convertir en string (format YYYY-MM-DD)
    level,
    status: faker.helpers.arrayElement(["enrolled", "repeating", "new"]),
  }))

  return {
    id: crypto.randomUUID(), // Génère un UUID pour chaque classe
    level,
    students,
  }
}

const ClassesPage = () => {
  // État pour gérer les classes initiales
  const [classes, setClasses] = useState<Class[]>([])

  // État pour gérer la classe actuellement sélectionnée
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  // Générer les classes après le rendu initial côté client
  useEffect(() => {
    const generatedClasses = levels.map((level) => generateClass(level))
    setClasses(generatedClasses)
    setSelectedClass(generatedClasses[0]) // Sélectionne la première classe par défaut
  }, [])

  // Fonction pour mettre à jour le statut d'un élève
  const updateStudentStatus = (classId: string, studentId: string, newStatus: string) => {
    setClasses((prevClasses) =>
      prevClasses.map((classe) =>
        classe.id === classId
          ? {
              ...classe,
              students: classe.students.map((student) =>
                student._id === studentId ? { ...student, status: newStatus } : student
              ),
            }
          : classe
      )
    )
  }

  // Fonction pour changer la classe sélectionnée
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value
    const classToDisplay = classes.find((classe) => classe.id === classId)

    if (classToDisplay) {
      setSelectedClass(classToDisplay)
    }
  }

  // Vérifie que les classes sont disponibles avant de tenter de rendre
  if (!selectedClass) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Gestion des classes</h1>

      {/* Sélecteur de classe */}
      <div className="mb-6">
        <label className="mr-4">Choisissez une classe :</label>
        <select
          className="border p-2"
          value={selectedClass.id}
          onChange={handleClassChange}
        >
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.level}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des étudiants */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Classe : {selectedClass.level}</h2>
        <ul className="space-y-4">
          {selectedClass.students.map((student) => (
            <li
              key={student._id}
              className="flex items-center justify-between rounded border p-2 shadow-sm"
            >
              <div>
                <p>
                  <strong>
                    {student.firstName} {student.lastName}
                  </strong>{" "}
                  - {student.level}
                </p>
                <p>Date de naissance : {student.birthDate}</p>
              </div>
              <div>
                {/* Boutons pour changer le statut */}
                <button
                  onClick={() => updateStudentStatus(selectedClass.id, student._id, "enrolled")}
                  className={`rounded px-2 py-1 text-sm ${
                    student.status === "enrolled" ? "bg-green-500 text-white" : "bg-gray-300"
                  }`}
                >
                  Enrolled
                </button>
                <button
                  onClick={() => updateStudentStatus(selectedClass.id, student._id, "repeating")}
                  className={`ml-2 rounded px-2 py-1 text-sm ${
                    student.status === "repeating" ? "bg-yellow-500 text-white" : "bg-gray-300"
                  }`}
                >
                  Repeating
                </button>
                <button
                  onClick={() => updateStudentStatus(selectedClass.id, student._id, "new")}
                  className={`ml-2 rounded px-2 py-1 text-sm ${
                    student.status === "new" ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  New
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ClassesPage
