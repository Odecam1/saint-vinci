import routes from "@/utils/routes"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Saint-Vinci</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href={routes.home()} className="hover:text-gray-300">
                Accueil
              </Link>
            </li>
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
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
