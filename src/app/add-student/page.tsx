/* eslint-disable no-console */
"use client"

import { Button } from "@/components/ui/button"
import apiRoutes from "@/utils/statics/apiRoutes"
import React, { useEffect, useState } from "react"

// Définition du type pour les étudiants
type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  level: string
  teacherName: string
}

const AddStudentsPage = () => {
  // États pour gérer le formulaire d'ajout et les étudiants existants
  const [formData, setFormData] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    birthDate: "",
    level: "",
    teacherName: "",
  })
  const [students, setStudents] = useState<Student[]>([])

  // Récupérer les étudiants depuis l'API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(apiRoutes.students.getAll())
        const data = await response.json()
        setStudents(data.students) // Assumer que la réponse a une propriété "students"
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error)
      }
    }

    fetchStudents()
  }, [])

  // Fonction pour ajouter un étudiant
  const addStudent = async (e: React.FormEvent) => {
    e.preventDefault()

    // Envoie la requête POST à l'API
    try {
      const response = await fetch(apiRoutes.students.getAll(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.message) // Affiche le message de succès

        // Ajoute le nouvel étudiant à la liste et réinitialise le formulaire
        setStudents((prev) => [...prev, { ...formData, _id: data.student._id }])
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          level: "",
          teacherName: "",
        })
      } else {
        const errorData = await response.json()
        console.error("Erreur lors de l'ajout de l'étudiant.", errorData)
        console.log("Données envoyées :", formData)
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API :", error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Gestion des étudiants</h1>

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
          <input
            type="text"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Nom du professeur</label>
          <input
            type="text"
            value={formData.teacherName}
            onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <Button type="submit" variant="default" className="mt-4 w-fit">
          Ajouter l&apos;étudiant
        </Button>
      </form>

      {/* Liste des étudiants */}
      <h2 className="mt-6 text-xl font-semibold">Liste des étudiants</h2>
      <ul className="mt-4 space-y-2">
        {students.map((student) => (
          <li key={student._id} className="rounded border p-2">
            {student.firstName} {student.lastName} - {student.level} (Professeur : {student.teacherName})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AddStudentsPage
