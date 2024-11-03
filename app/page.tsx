"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthenticationPage from "./authentication/page"

// This is a placeholder - replace with your actual auth checking logic
const checkAuthStatus = () => {
  // For now, we'll check localStorage, but you should implement proper auth checking
  return localStorage.getItem("isAuthenticated") === "true"
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = checkAuthStatus()
    
    if (isAuthenticated) {
      router.push("/acompanhamento")
    }
  }, [router])

  return <AuthenticationPage />
}