import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";



export const GotoHomePage = (router : AppRouterInstance) => {
    router.push('/')
    return;
}

export const GotoLoginPage = (router : AppRouterInstance) => {
    router.push('/authentication/login')
    return;
}