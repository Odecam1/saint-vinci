"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"

const RegisterPage = () => {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")

      
return
    }

    // Ajoute ici la logique de gestion de l'inscription
      // Exemple : appel à une API d'inscription
      
    // eslint-disable-next-line no-console
    console.log("Inscription en cours", { nom, prenom, email, password })

    // Réinitialiser les champs si l'inscription réussit
    setNom("")
    setPrenom("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="mt-8 flex justify-center text-slate-700">
      <form  onSubmit={handleRegister} className="w-full max-w-sm rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl">Inscription</h1>
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mb-3">
          <label>Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mb-3">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <Button type="submit" variant="default" className="mt-4 w-full">
          S&apos;inscrire
        </Button>
      </form>
    </div>
  )
}

export default RegisterPage