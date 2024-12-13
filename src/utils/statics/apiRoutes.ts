const apiRoutes = {
  login: () => "/api/login",
  classes: {
    getAll: () => "/api/classes",
    post: () => "/api/classes",
  },
  students: {
    single: () => "/api/student",
    multiple: () => "/api/students",
  },
}

export default apiRoutes
