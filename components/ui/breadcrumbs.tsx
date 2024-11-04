"use client"

import { useBreadcrumbs } from "@/app/hooks/useBreadcrumbs"
import { 
  Breadcrumb, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbItem, 
  BreadcrumbPage, 
  BreadcrumbList 
} from "./breadcrumb"

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ href, text, isLast }) => (
          <BreadcrumbItem key={href} className="hidden md:block">
            {isLast ? (
              <BreadcrumbPage>{text}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={href}>{text}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 