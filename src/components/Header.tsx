import routes from "@/utils/statics/routes"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-blue-600 px-4 text-white">
      <div className="flex items-center justify-between">
        <Link href={routes.home()}>
          <Image
            src="/logo-saint-vinci.png"
            alt="Saint-Vinci Logo"
            width={80}
            height={50}
            className="m-2 invert"
          />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href={routes.home()} className="hover:text-gray-300">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="test" className="hover:text-gray-300">
                Test
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
