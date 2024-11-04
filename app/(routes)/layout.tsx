"use client"

import { useAuth } from "@/app/contexts/auth-context"
import SidebarComponent from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [isAuthenticated])

  // Don't render anything until we've checked auth status
  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // If not authenticated, just render children (login page)
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    )
  }

  // If authenticated, render with sidebar
  return (
    <div className="flex min-h-screen w-full">
      <SidebarComponent>{children}</SidebarComponent>
    </div>
  )
}
