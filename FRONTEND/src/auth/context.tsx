import { createContext, useEffect } from "react";
import { login, register, getMe } from "./api"
import { useState } from "react"
import { type User } from "./api"

export const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [isAuthChecking, setIsAuthChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getMe()
                if (res.success) {
                    setUser(res.user)
                }
            } catch (error) {
                console.log("No valid session")
                setUser(null)
            } finally {
                setIsAuthChecking(false)
            }
        }
        checkAuth()
    }, [])

    const registerUser = async function ({ fullname, email, password, role }: User) {
        try {
            const res = await register({ fullname, password, email, role })
            setUser(res.user) // The critical fix
            return res.user;
        }
        catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }
    const LoginUser = async function ({ email, password }: Pick<User, 'email' | 'password'>) {
        try {
            const res = await login({ email, password })
            setUser(res.user) // set user upon login
            return res.user;
        }
        catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, isAuthChecking, registerUser, LoginUser, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}