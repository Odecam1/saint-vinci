import routes, { publicRoutes } from "@/utils/statics/routes"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("vinci-jwt-token")
  const requestedPath = request.nextUrl.pathname

  if (!token && !publicRoutes.includes(requestedPath)) {
    const loginUrl = new URL(routes.login(), request.url)
    loginUrl.searchParams.set("next", requestedPath) // Ajouter `next`

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/test"],
}
