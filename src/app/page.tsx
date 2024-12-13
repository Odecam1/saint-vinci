"use client"
import { cn } from "@/lib/utils"
import auth from "@/utils/authentification"
import apiRoutes from "@/utils/statics/apiRoutes"
import { FC, useEffect, useState } from "react"
import { FaAngleDown, FaAngleRight } from "react-icons/fa6"

type Class = {
  _id: string
  teacher: string
  level: string
}

type Student = {
  _id: string
  firstName: string
  lastName: string
  birthDate: Date
  classId: Class
}

const Home: FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [openClass, setOpenClass] = useState<string | null>(null)

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticate())
  }, [])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(apiRoutes.students.multiple())

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des données des élèves",
          )
        }

        const { students } = await response.json()

        setStudents(students)
      } catch (error) {
        console.error("Erreur lors de la récupération des élèves", error)
      }
    }

    fetchStudents()
  }, [])

  const handleToggle = (classId: string) => {
    setOpenClass(openClass === classId ? null : classId)
  }

  const groupedClasses = students.reduce(
    (acc: Record<string, Student[]>, student: Student) => {
      if (!acc[student.classId.teacher]) {
        acc[student.classId.teacher] = []
      }

      acc[student.classId.teacher].push(student)

      return acc
    },
    {},
  )

  return (
    <div className="p-8">
      <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Bienvenue sur le site du groupe scolaire Saint Exupery
        </h1>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Liste des classes
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(groupedClasses).map(([classId, students]) => {
            const teacherName = students[0]?.classId?.teacher // Récupérer le nom du professeur
            const level = students[0]?.classId?.level

            return (
              <div
                key={classId}
                className={cn(
                  "rounded-lg border p-4 shadow-sm",
                  openClass === classId ? "border-2 border-blue-600" : "",
                )}
              >
                <h3
                  className="mb-4 flex flex-row items-center text-xl text-gray-700 hover:cursor-pointer"
                  onClick={() => handleToggle(classId)}
                >
                  Classe de : {teacherName} ({level})
                  {openClass === classId ? (
                    <FaAngleDown className="m-2 text-gray-500" />
                  ) : (
                    <FaAngleRight className="m-2 text-gray-500" />
                  )}
                </h3>
                {openClass === classId && (
                  <table className="w-full table-auto border-collapse border border-blue-300 text-left text-sm text-gray-600 ">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          Prénom
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Nom
                        </th>
                        {isAuthenticated && (
                          <th className="border border-gray-300 px-4 py-2">
                            Naissance
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .slice()
                        .sort((a, b) => a.firstName.localeCompare(b.firstName))
                        .map((student) => (
                          <tr key={student._id}>
                            <td className="border border-gray-300 px-4 py-2">
                              {student.firstName}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {student.lastName}
                            </td>
                            {isAuthenticated && (
                              <td className="border border-gray-300 px-4 py-2">
                                {new Date(
                                  student.birthDate,
                                ).toLocaleDateString()}
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Home
