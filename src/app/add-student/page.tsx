"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"

// Définition du type pour les étudiants
type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  level: string
  status: string
}

const AddStudentsPage = () => {
  // Liste des niveaux possibles
  const levels = ["PS", "MS", "GS", "CP", "CE1", "CE2", "CM1", "CM2"]

  // État pour gérer la liste des étudiants
  const [students, setStudents] = useState<Student[]>([
    {
      _id: "4710cd64-9dc4-4379-816c-d03df9e56de3",
      firstName: "Tonya",
      lastName: "Jones",
      birthDate: "2019-06-03",
      level: "MS",
      status: "enrolled",
    },
  ])

  // État pour gérer le formulaire d'ajout
  const [formData, setFormData] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    birthDate: "",
    level: levels[0], // Définir le premier niveau par défaut
    status: "enrolled",
  })

  // Fonction pour ajouter un étudiant
  const addStudent = (e: React.FormEvent) => {
    e.preventDefault()

    // Crée un nouvel étudiant avec un ID unique
    const newStudent: Student = {
      _id: crypto.randomUUID(),
      ...formData,
    }

    // Ajoute l'étudiant à la liste
    setStudents((prev) => [...prev, newStudent])

    // Réinitialise le formulaire
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      level: levels[0], // Réinitialise au premier niveau par défaut
      status: "enrolled",
    })
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Gestion des étudiants</h1>

      {/* Liste des étudiants */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Liste des étudiants</h2>
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student._id}
              className="flex items-center justify-between rounded border p-4 shadow-md"
            >
              <div>
                <p>
                  <strong>
                    {student.firstName} {student.lastName}
                  </strong>{" "}
                  - {student.level}
                </p>
                <p>Date de naissance : {new Date(student.birthDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulaire pour ajouter un étudiant */}
      <form onSubmit={addStudent} className="space-y-4">
        <h2 className="text-xl font-semibold">Ajouter un étudiant</h2>

        <div>
          <label className="block font-medium">Prénom</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Nom</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Date de naissance</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Niveau</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full rounded border p-2"
            required
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="default" className="mt-4 w-fit">
          Ajouter l&apos;étudiant
        </Button>
      </form>
    </div>
  )
}

export default AddStudentsPage
