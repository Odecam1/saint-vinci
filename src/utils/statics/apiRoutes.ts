const apiRoutes = { 
  login: () => "/api/login",
  classes: {
    getAll: () => "/api/classes",
    post: () => "/api/classes",
  },
  students: {
    getAll: () => "/api/students",
  },
}

export default apiRoutes
