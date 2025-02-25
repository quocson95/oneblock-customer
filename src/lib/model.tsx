export const RoleAdmin = 1
export const RoleManager = 2
export const RoleCustomer = 3

export interface User {
    userName: string
    email: string
    picture: string
    lastLoginUnix: number
    role: number
    subscribe: Subscribe,
}

export interface Subscribe {
    plan?: Plan,
    expireUnix: number,
    expireDate: string
}

export interface Plan {
    id: number
    name: string
    price: number
    priceDisp: string
    currency: string
    durationExtend: string
    desp: string

}