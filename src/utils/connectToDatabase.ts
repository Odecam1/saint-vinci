import mongoose from "mongoose"

const connectToDatabase = async () => {
  const MondoUri = process.env.MONGO_URI

  if (!MondoUri) {
    throw new Error("Mongo URI is not defined in environment variables")
  }

  await mongoose.connect(MondoUri)
}

export default connectToDatabase
