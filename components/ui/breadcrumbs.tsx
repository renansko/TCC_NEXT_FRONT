"use client"

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { 
  Breadcrumb, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbItem, 
  BreadcrumbPage, 
  BreadcrumbList 
} from "./breadcrumb"
import Link from "next/link"
import { Icons } from "./Icons"

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb className="flex justify-start items-center">
      <BreadcrumbList>
        {breadcrumbs.map(({ href, text, isLast, isHome }, index) => (
          <BreadcrumbItem key={href} className="hidden md:inline-flex items-center">
            {isLast ? (
              <BreadcrumbPage>{text}</BreadcrumbPage>
            ) : isHome ? (
              <Link href="/">
                <Icons.home />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <BreadcrumbLink href={href}>{text}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </div>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 