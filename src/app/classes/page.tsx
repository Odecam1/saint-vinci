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
  status: "enrolled" | "repeating"
}

type Class = {
  _id: string
  teacher: string
  level: string
}

const ClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  useEffect(() => {
    const fetchClassesAndStudents = async () => {
      try {
        const classesResponse = await fetch("/api/classes")
        const classesData = await classesResponse.json()
        setClasses(classesData.classes)

        const studentsResponse = await fetch("/api/students")
        const studentsData = await studentsResponse.json()
        setStudents(studentsData.students)

        setSelectedClass(classesData.classes[0])
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error)
      }
    }

    fetchClassesAndStudents()
  }, [])

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value
    const classToDisplay = classes.find((classe) => classe._id === classId)
    setSelectedClass(classToDisplay || null)
  }

  const handleStatusChange = async (studentId: string, newStatus: "enrolled" | "repeating") => {
    try {
      const updatedStudents = students.map((student) =>
        student._id === studentId ? { ...student, status: newStatus } : student
      )
      setStudents(updatedStudents)

      // Ici, tu enverrais une requête API pour sauvegarder le nouveau statut dans la base de données
      await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error)
    }
  }

  if (!students.length || !selectedClass) {
    return <div>Chargement...</div>
  }

  const classStudents = students.filter((student) => student.classId === selectedClass._id)

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Gestion des classes</h1>

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
                <div className="flex space-x-2">
                  <span
                  className={`cursor-pointer ${student.status === "repeating" ? "text-red-500" : "text-green-500"}`}
                  onClick={() => handleStatusChange(student._id, student.status === "repeating" ? "enrolled" : "repeating")}
                >
                  {student.status === "repeating" ? "Redoublant" : "Enrôlé"}
                </span>

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
