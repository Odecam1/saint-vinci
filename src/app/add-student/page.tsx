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
  classId: string
  status: string
}

type Class = {
  _id: string
  teacher: string
  level: string
}

const AddStudentsPage = () => {
  // États pour gérer le formulaire d'ajout et les classes disponibles
  const [formData, setFormData] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    birthDate: "",
    classId: "", // initialisation avec classId
    status: "enrolled",
  })
  const [classes, setClasses] = useState<Class[]>([])

  // Récupérer les classes depuis l'API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(apiRoutes.classes.getAll())
        const data = await response.json()
        setClasses(data.classes) // Assumer que la réponse a une propriété "classes"
      } catch (error) {
        console.error("Erreur lors de la récupération des classes", error)
      }
    }

    fetchClasses()
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

        // Réinitialise le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          classId: "", // Réinitialise le classId
          status: "enrolled",
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
          <label className="block font-medium">Classe</label>
          <select
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            className="w-full rounded border p-2"
            required
          >
            <option value="">Sélectionner une classe</option>
            {classes.map((classe) => (
              <option key={classe._id} value={classe._id}>
                {classe.level} - Professeur : {classe.teacher}
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
