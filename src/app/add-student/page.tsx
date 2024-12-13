/* eslint-disable no-console */
"use client"
import { Button } from "@/components/ui/button"
import apiRoutes from "@/utils/statics/apiRoutes"
import React, { useEffect, useState } from "react"

type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  level: string
  teacherName: string
}

const AddStudentsPage = () => {
  const [students, setStudents] = useState()
  const [formData, setFormData] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    birthDate: "",
    level: "",
    teacherName: "",
  })

  // Récupérer les étudiants depuis l'API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(apiRoutes.students.multiple())
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

    // Vérifie si la classe existe et ajoute-la si nécessaire
    try {
      // Ajouter la classe si elle n'existe pas déjà
      const responseClasses = await fetch(apiRoutes.classes.getAll())
      const classesData = await responseClasses.json()

      const classExists = classesData.classes.some(
        (classItem: any) =>
          classItem.level === formData.level &&
          classItem.teacher === formData.teacherName,
      )

      // Si la classe n'existe pas, on l'ajoute
      if (!classExists) {
        await fetch(apiRoutes.classes.post(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level: formData.level,
            teacher: formData.teacherName,
          }),
        })
      }

      // Ajouter l'étudiant
      const response = await fetch(apiRoutes.students.multiple(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.message) // Affiche le message de succès

        // Réinitialiser le formulaire après l'ajout
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
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Nom</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Date de naissance</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Niveau</label>
          <select
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
            className="w-full rounded border p-2"
            required
          >
            <option value="" disabled>
              Sélectionner un niveau
            </option>
            <option value="1ère section maternelle">
              1ère section maternelle
            </option>
            <option value="2ème section maternelle">
              2ème section maternelle
            </option>
            <option value="3ème section maternelle">
              3ème section maternelle
            </option>
            <option value="CP">CP</option>
            <option value="CE1">CE1</option>
            <option value="CE2">CE2</option>
            <option value="CM1">CM1</option>
            <option value="CM2">CM2</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Nom du professeur</label>
          <input
            type="text"
            value={formData.teacherName}
            onChange={(e) =>
              setFormData({ ...formData, teacherName: e.target.value })
            }
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
            {student.firstName} {student.lastName} - {student.level} (Professeur
            : {student.teacherName})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AddStudentsPage
