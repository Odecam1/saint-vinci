const roles = {
  MAYOR: "maire",
  DIRECTOR: "directrice",
  TEACHER: "professeur",
} as const

export type Roles = (typeof roles)[keyof typeof roles]

export default roles
