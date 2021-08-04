import axios from 'axios'
import prompts from 'app/quasar.extensions.json'
import { Cookies } from "quasar";

export default ({ app, router }) => {

    // Set Route guard
    router.beforeEach((to, from, next) => {
        const record = to.matched.find((record) => record.meta.auth)

        if (record && to.name !== 'login' && ! Cookies.get('authorization_token')) next({ name: 'login' })
        else if (Cookies.get('authorization_token') && to.name === 'login') {
            router.back()
        } else next()
    })

    // Register routes
    let { routes } = router.options
    let baseRoute = routes.find((route) => route.path === '/')
    const currentRoutes = baseRoute.children.map((route) => route.path)
    const newRoutes = [
        {
            path: '/login',
            name: 'login',
            component: () => import('simple-auth/pages/Login')
        },
        {
            path: '/protected-route',
            name: 'protected-route',
            component: () => import('simple-auth/pages/ProtectedRoute'),
            meta: {
                auth: true
            }
        }
    ]

    newRoutes.forEach((route) => {
        if (!currentRoutes.includes(route.path)) {
            router.addRoute(route)
        }
    })

    // Register auth helper
    var authHelper = {}

    const API_URL = prompts['simple-auth'].apiUrl
    const LOGIN_ROUTE = prompts['simple-auth'].loginRoute

    authHelper.login = async (data) => {
        return axios.post(`${API_URL}${LOGIN_ROUTE}`, data)
    }

    app.provide('$auth', authHelper)
}
