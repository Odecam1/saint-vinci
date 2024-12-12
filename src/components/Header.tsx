"use client"
import routes from "@/utils/statics/routes"
import cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

const Header: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = cookies.get("vinci-jwt-token")
    setIsAuthenticated(!!token)
  }, [setIsAuthenticated])

  const handleLogout = () => {
    cookies.remove("vinci-jwt-token")
    setIsAuthenticated(false)
    router.push(routes.login())
  }

  return (
    <header className="bg-blue-600 px-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center  space-x-6 p-1 align-middle">
          <Link href={routes.home()}>
            <Image
              src="/logo-SAINT_EXUPERY.png"
              alt="Saint-Vinci Logo"
              width={80}
              height={50}
              className="m-2 invert"
            />
          </Link>
          <Link href={routes.home()} className="hover:text-gray-300">
            Accueil
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            {isAuthenticated && (
              <>
                <li>
                  <Link href="#students" className="hover:text-gray-300">
                    Gestion des élèves
                  </Link>
                </li>
                <li>
                  <Link href="#classes" className="hover:text-gray-300">
                    Gestion des classes
                  </Link>
                </li>
                <li>
                  <Link href="#reports" className="hover:text-gray-300">
                    Rapports
                  </Link>
                </li>
                <li>
                  <Link href="#settings" className="hover:text-gray-300">
                    Paramètres
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <button
          onClick={
            isAuthenticated ? handleLogout : () => router.push(routes.login())
          }
          className="ml-4 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-500"
        >
          {isAuthenticated ? "Se déconnecter" : "Se connecter"}
        </button>
      </div>
    </header>
  )
}

export default Header
