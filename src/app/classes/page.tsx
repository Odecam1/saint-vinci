/* eslint-disable no-console */
"use client"

import React, { useEffect, useState } from "react"

// Définition des types pour les étudiants et les classes
type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  classId: string
}

type Class = {
  _id: string
  teacher: string
  level: string
}

const ClassesPage = () => {
  // États pour gérer les classes et les étudiants
  const [classes, setClasses] = useState<Class[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  // Récupérer les données de l'API pour les classes et les étudiants
  useEffect(() => {
    const fetchClassesAndStudents = async () => {
      try {
        // Récupérer les classes
        const classesResponse = await fetch("/api/classes")
        const classesData = await classesResponse.json()
        setClasses(classesData.classes)

        // Récupérer les étudiants
        const studentsResponse = await fetch("/api/students")
        const studentsData = await studentsResponse.json()
        setStudents(studentsData.students)

        // Sélectionner la première classe par défaut
        setSelectedClass(classesData.classes[0])
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error)
      }
    }

    fetchClassesAndStudents()
  }, [])

  // Fonction pour changer la classe sélectionnée
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value
    const classToDisplay = classes.find((classe) => classe._id === classId)
    setSelectedClass(classToDisplay || null)
  }

  // Vérifie que les classes et les étudiants sont disponibles avant de tenter de rendre
  if (!students.length || !selectedClass) {
    return <div>Chargement...</div>
  }

  // Filtrer les étudiants pour la classe sélectionnée
  const classStudents = students.filter((student) => student.classId === selectedClass._id)

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Gestion des classes</h1>

      {/* Sélecteur de classe */}
      <div className="mb-6">
        <label className="mr-4">Choisissez une classe :</label>
        <select
          className="border p-2"
          value={selectedClass._id}
          onChange={handleClassChange}
        >
          {classes.map((classe) => (
            <option key={classe._id} value={classe._id}>
              {classe.level} - {classe.teacher}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des étudiants de la classe sélectionnée */}
      <div>
        {classStudents.length > 0 ? (
          <ul className="space-y-4">
            {classStudents.map((student) => (
              <li key={student._id} className="flex items-center justify-between rounded border p-2 shadow-sm">
                <div>
                  <p>
                    <strong>{student.firstName} {student.lastName}</strong>
                  </p>
                  <p>Date de naissance : {new Date(student.birthDate).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Aucun étudiant dans cette classe</div>
        )}
      </div>
    </div>
  )
}

export default ClassesPage
