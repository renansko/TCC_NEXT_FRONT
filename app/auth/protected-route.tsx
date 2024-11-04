"use client"

// import { useAuth } from "@/app/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { user, isLoading } = useAuth()
  const user = localStorage.getItem("user")
  const isLoading = false
  const router = useRouter()

  console.log(user)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  }

  return user ? <>{children}</> : null
} 