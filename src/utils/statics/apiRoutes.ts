const apiRoutes = {
  login: () => "/api/login",
  classes: {
    getAll: () => "/api/classes",
  },
  students: {
    getAll: () => "/api/students",
  },
  liststudents: {
    post: () => "/api/liststudents",
    get: () => "/api/liststudents",
  },
}

export default apiRoutes
