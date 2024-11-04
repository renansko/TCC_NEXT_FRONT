import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const isAuthPage = request.nextUrl.pathname === "/" || 
                    request.nextUrl.pathname.startsWith('/authentication')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/acompanhamento')

  // Redireciona usuários não autenticados para a página de login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redireciona usuários autenticados para a página principal
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/acompanhamento', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/authentication/:path*', '/acompanhamento/:path*']
} 