const routes = {
  home: () => "/",
  login: () => "/login",
}

export default routes

export const publicRoutes = [routes.home(), routes.login()]

export const privateRoutes: string[] = ["/test"]
