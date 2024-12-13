import cookies from "js-cookie"
import jwt from "jsonwebtoken"

const isAuthenticate = () => {
  const token = cookies.get("vinci-jwt-token")

  return Boolean(token)
}

const logOut = () => {
  cookies.remove("vinci-jwt-token")
}

const getUser = () => {
  const token = cookies.get("vinci-jwt-token")

  if (token) {
    try {
      const decodedToken = jwt.decode(token)

      return decodedToken?.user || null
    } catch (error) {
      console.error("Veuillez vous reconnecter")

      return null
    }
  }

  return null
}

const auth = {
  isAuthenticate,
  logOut,
  getUser,
}

export default auth
