const roles = {
  DIRECTOR: "director",
  TEACHER: "teacher",
} as const

export type Roles = (typeof roles)[keyof typeof roles]

export default roles
