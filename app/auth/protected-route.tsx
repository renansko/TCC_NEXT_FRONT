"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication only on client side
    const isAuth = localStorage?.getItem("isAuthenticated")
    setIsAuthenticated(!!isAuth)
  }, [])

  useEffect(() => {
    // Only redirect if we've checked authentication
    if (isAuthenticated === false) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null
} 