const routes = {
  home: () => "/",
  login: () => "/login",
  addStudent: () => "/add-student",
  addstudentsFromFile: () => "/list-student",
}

export default routes

export const publicRoutes = [routes.home(), routes.login()]

export const privateRoutes: string[] = []
