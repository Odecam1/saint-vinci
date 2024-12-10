import Footer from "@/components/Footer"
import Header from "@/components/Header"
import updateTitle from "@/utils/updateTitle"
import { ReactNode } from "react"
import "./globals.css"

export const metadata = updateTitle({
  description: "Generated by create next app",
})

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="fr">
      <body>
        <main className="flex min-h-screen flex-col">
          <Header></Header>
          <section className="flex grow flex-col">{children}</section>
          <Footer></Footer>
        </main>
      </body>
    </html>
  )
}
export default RootLayout
