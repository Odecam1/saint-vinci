import { FC } from "react"
import Link from "next/link"

const Home: FC = () => {
  return (
    <div className="p-8">
      <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Bienvenue sur l'application Saint-Vinci
        </h1>
        <p className="text-lg text-gray-600">
          Gérez efficacement les élèves, les classes et les rapports avec notre application intuitive.
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Actions rapides</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <button>
          <Link href="/add-student">
          <div className="rounded-lg bg-blue-500 p-6 text-left text-white shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="text-xl font-medium">Ajouter un élève</h3>
            Ajoutez un nouvel élève à l'école facilement.
            </div>
          </Link>
          </button>
          <button>
          <Link href="/classes">
          <div className="rounded-lg bg-green-500 p-6 text-left text-white shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="text-xl font-medium">Gérer les classes</h3>
            <p className="mt-2">Visualiser les classes et gérer leurs élèves.</p>
            </div>
          </Link>
          </button>
          <div className="rounded-lg bg-yellow-500 p-6 text-white shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="text-xl font-medium">Voir les rapports</h3>
            <p className="mt-2">Consultez les rapports et générez des documents pour les enseignants.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home