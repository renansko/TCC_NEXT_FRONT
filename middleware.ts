import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verifica se o usuário está autenticado
  const isAuthenticated = request.cookies.get('auth-token') // Substitua pelo nome real do seu token de autenticação

  // Se estiver acessando rotas protegidas e não estiver autenticado, redireciona para login
  if (request.nextUrl.pathname.startsWith('/acompanhamento') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Se estiver acessando página de login enquanto autenticado, redireciona para acompanhamento
  if (request.nextUrl.pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/acompanhamento', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/acompanhamento/:path*']
} 