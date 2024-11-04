"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [router, isAuthenticated])

  const checkAuth = async () => {
    try {
      // Check localStorage for authentication
      const isAuth = localStorage?.getItem("isAuthenticated")
      const user = localStorage?.getItem("user")
      setIsAuthenticated(!!isAuth)
      setUser(JSON.parse(user || "{ id: '', email: '', name: '' }"))
      
      router.push("/menu")
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const fakeUser = {
        id: "1",
        email,
        name: "User",
        password,
      }
      
      // Store authentication in localStorage
      localStorage.setItem("isAuthenticated", "true")
      setUser(fakeUser)
      router.push("/acompanhamentos")
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      localStorage.removeItem("isAuthenticated")
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Erro no logout:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
} 