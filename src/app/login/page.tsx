"use client"
import { cn } from "@/lib/utils"
import apiRoutes from "@/utils/statics/apiRoutes"
import routes from "@/utils/statics/routes"
import { Button } from "@@/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaSpinner } from "react-icons/fa"
import { z } from "zod"

const UserCredentialsSchema = z.object({
  email: z.string().email("Veuillez entrer un email valide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères.")
    .max(50, "Le mot de passe ne peut dépasser 50 caractères."),
})

export type UserCredentials = z.infer<typeof UserCredentialsSchema>

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>({
    resolver: zodResolver(UserCredentialsSchema),
  })
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: UserCredentials) => {
    setIsLoading(true)

    try {
      const res = await fetch(apiRoutes.login(), {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      })
      const json = await res.json()

      if (!json.success) {
        setError(true)
      } else {
        cookies.set("vinci-jwt-token", json.jwtToken)

        const next =
          new URLSearchParams(window.location.search).get("next") ||
          routes.home()
        router.push(next)
        window.location.href = next
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-24 flex items-center justify-center text-slate-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded bg-white p-6 shadow-md"
      >
        <h1 className="mb-4 text-2xl">Connexion</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={cn(
              "w-full rounded border p-2",
              errors.email ? "border-red-500" : "",
            )}
          />
        </div>
        <div className="mb-4">
          <label>Mot de passe</label>
          <input
            type="password"
            {...register("password")}
            className={cn(
              "w-full rounded border p-2",
              errors.password ? "border-red-500" : "",
            )}
          />
        </div>
        <div className="mt-4 text-center">
          <Button
            type="submit"
            className={cn(
              "mt-4 w-full",
              isLoading ? "cursor-not-allowed opacity-50" : "",
            )}
            disabled={isLoading}
          >
            <FaSpinner className={isLoading ? "animate-spin" : "hidden"} />
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
