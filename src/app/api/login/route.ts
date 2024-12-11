import { User } from "@/database/models/Users"
import connectToDatabase from "@/utils/connectToDatabase"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    await connectToDatabase()

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe sont requis." },
        { status: 400 },
      )
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { message: "Impossible de se connecter." },
        { status: 401 },
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Impossible de se connecter." },
        { status: 401 },
      )
    }

    const jwtToken = jwt.sign(
      {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    )

    return NextResponse.json({
      success: true,
      message: "Connexion réussie.",
      jwtToken,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur interne", error: error.message },
      { status: 500 },
    )
  }
}
