"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Veuillez renseigner tous les champs.")

      
return
    }

    setError("") // Réinitialiser les erreurs
      // Ajouter la logique pour se connecter (API ou autre)
    // eslint-disable-next-line no-console
    console.log("Tentative de connexion", { email, password })
  }

  return (
    <div className="mt-24 flex items-center justify-center text-slate-700">
      <form onSubmit={handleLogin} className="w-full max-w-sm rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl">Connexion</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        <Button type="submit" className="mt-4 w-full">
          Connexion
        </Button>

        <div className="mt-4 text-center">
          <Link href="/auth/forgetPassword">
            <Button variant="link" className="mt-2 w-full">
              Mot de passe oublié ?
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage