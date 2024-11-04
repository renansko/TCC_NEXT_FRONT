"use client"

import { Separator } from "@radix-ui/react-separator"
import { SidebarTrigger } from "./sidebar/sidebar"
import { Breadcrumbs } from "./breadcrumbs"

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumbs />
    </div>
  </header>
  )
}