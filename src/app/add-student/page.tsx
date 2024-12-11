/* eslint-disable no-console */
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

  // État pour gérer le formulaire d'ajout
  const [formData, setFormData] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    birthDate: "",
    level: levels[0], // Définir le premier niveau par défaut
    status: "enrolled",
  })

  // Fonction pour ajouter un étudiant
  const addStudent = async (e: React.FormEvent) => {
    e.preventDefault()

    // Envoie la requête POST à l'API
    try {
      const response = await fetch("/api/students", {
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
          level: levels[0], // Réinitialise au premier niveau par défaut
          status: "enrolled",
        })
      } else {
        console.error("Erreur lors de l'ajout de l'étudiant.")
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
