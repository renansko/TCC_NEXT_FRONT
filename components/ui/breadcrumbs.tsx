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
        {breadcrumbs.map(({ href, text, isLast, isHome }) => (
          <BreadcrumbItem key={href} className="hidden md:block">
            {isLast ? (
              <BreadcrumbPage>{text}</BreadcrumbPage>
            ) : isHome ? (
              <Link href="/">
                <Icons.home />
              </Link>

            ) : (
              <span className="flex items-center gap-1">
                <BreadcrumbLink href={href}>{text}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 