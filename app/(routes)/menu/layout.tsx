"use client"

import SidebarComponent from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen w-full">
      <SidebarComponent>{children}</SidebarComponent>
    </div>
  )
}
