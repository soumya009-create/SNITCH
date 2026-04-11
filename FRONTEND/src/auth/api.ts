import axios from "axios";
export interface User {
    fullname: string,
    email: string,
    password: string,
    role: string
}

const api = axios.create({
    baseURL: "http://localhost:3000/api/user",
    withCredentials: true
})

export async function register({ fullname, email, password, role }: User) {
    try {
        const response = await api.post("/register", { fullname, email, password, role })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function login({ email, password }: Pick<User, 'email' | 'password'>) {
    try {
        const response = await api.post("/login", { email, password })
        return response.data
    } catch (err) {
        console.log(err)
    }
}