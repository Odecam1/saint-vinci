import routes from "@/utils/statics/routes"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex gap-2 flex-col items-center h-fit justify-center flex-grow  ">
      <h2 className="font-semibold">
        La page que vous recherchez n'existe pas ou est en cours de
        développement.
      </h2>

      <Link
        className="rounded bg-slate-600 text-white p-2"
        href={routes.home()}
      >
        Aller à l'accueil
      </Link>
    </div>
  )
}
