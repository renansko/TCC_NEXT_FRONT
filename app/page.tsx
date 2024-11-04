"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const AuthenticationPage = dynamic(() => import("./(routes)/authentication/page"), {
  ssr: false,
})

const checkAuthStatus = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("auth-token") !== null
  }
  return false
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = checkAuthStatus()
    
    if (isAuthenticated) {
      router.push("/menu")
    }
  }, [router])

  return <AuthenticationPage />
}