"use client"
import auth from "@/utils/authentification"
import roles, { Roles } from "@/utils/statics/roles"
import routes from "@/utils/statics/routes"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

const Header: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const authenticated = auth.isAuthenticate()
    setIsAuthenticated(authenticated)

    if (authenticated) {
      const currentUser = auth.getUser()
      setUser({
        name: currentUser.firstName + " " + currentUser.lastName,
        role: currentUser.role as Roles,
      })
    }
  }, [])

  const handleLogout = () => {
    auth.logOut()
    setIsAuthenticated(false)
    router.push(routes.home())
  }

  return (
    <header className="bg-blue-600 px-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center  space-x-6 p-1 py-4 align-middle">
          <Link href={routes.home()}>
            <Image
              src="/logo-SAINT_EXUPERY.png"
              alt="Saint-Vinci Logo"
              width={120}
              height={50}
              className="m-2 invert"
            />
          </Link>
          <Link href={routes.home()} className="hover:text-gray-300">
            Accueil
          </Link>
        </div>
        <nav>
          <ul className="flex gap-x-2">
            {isAuthenticated && (
              <>
                {auth.getUser().role === roles.MAYOR && (
                  <>
                    <li>
                      <Link
                        href={routes.addStudent()}
                        className="rounded  p-2 text-white hover:bg-gray-700"
                      >
                        Ajouter un élève
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.addstudentsFromFile()}
                        className="rounded  p-2 text-white hover:bg-gray-700"
                      >
                        Ajouter la liste des élèves
                      </Link>
                    </li>
                  </>
                )}
                {(auth.getUser().role === roles.DIRECTOR ||
                  auth.getUser().role === roles.MAYOR) && (
                  <li>
                    <Link
                      href="cloturer-annee"
                      className="rounded  p-2 text-white hover:bg-gray-700"
                    >
                      Cloturer l'année
                    </Link>
                  </li>
                )}
                {auth.getUser().role === roles.TEACHER && (
                  <li>
                    <Link href="redoublement" className="hover:text-gray-300">
                      Indiquer un redoublement
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user && (
            <span className="text-sm text-gray-200">
              {user.name} ({user.role})
            </span>
          )}
          <button
            onClick={
              isAuthenticated ? handleLogout : () => router.push(routes.login())
            }
            className="ml-4 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-500"
          >
            {isAuthenticated ? "Se déconnecter" : "Se connecter"}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
