export const RoleAdmin = 1
export const RoleManager = 2
export const RoleCustomer = 3

export interface User {
    userName: string
    email: string
    picture: string
    lastLoginUnix: number
    role: number
}