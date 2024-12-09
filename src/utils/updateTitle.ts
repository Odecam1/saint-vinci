import { Metadata } from "next"

type UpdateTitleParams = {
  title?: string
  description?: string
}

const updateTitle = ({ title, description }: UpdateTitleParams): Metadata => {
  const metadata: Metadata = {
    title: title ? `Saint Vinci | ${title}` : "Saint Vinci | Accueil",
  }

  if (description) {
    metadata.description = description
  }

  return metadata
}

export default updateTitle
