"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface Breadcrumb {
  href: string;
  text: string;
  isLast: boolean;
  isHome: boolean;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const pathname = usePathname();

  return useMemo(() => {
    // Remove leading and trailing slashes
    const segments = pathname
      .split('/')
      .filter(Boolean);

    // Don't show breadcrumbs on authentication pages
    if (segments[0] === "authentication") {
      return [];
    }

    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const isLast = index === segments.length - 1;
      const isHome = href === "/";

      // Format the segment text (capitalize first letter, replace hyphens with spaces)
      const formattedSegment = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        href,
        text: formattedSegment,
        isLast,
        isHome
      };
    });
  }, [pathname]);
}
