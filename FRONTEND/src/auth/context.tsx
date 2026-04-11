import { createContext } from "react";
import { login, register } from "./api"
import { useState } from "react"
import { type User } from "./api"
export const AuthContext = createContext(null)

export function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser = async function ({ fullname, email, password, role }: User) {
        try {
            const res = await register({ fullname, password, email, role })
            if (res.data.success) {
                setUser(res.data.user)

            }
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const LoginUser = async function ({ email, password }: User) {
        try {
            const res = await login({ email, password })
            return res.data
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{ user, loading, registerUser, LoginUser, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}