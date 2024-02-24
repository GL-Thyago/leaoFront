import { NextResponse } from 'next/server'
import { getCookieFromBrowser } from './services/cookies';
// import type { NextRequest } from 'next/server'
 
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // pegar o token da requisição verificar se é viavel
    // if (token){
    //     console.log('Teste')
    // }
    // return NextResponse.rewrite(new URL('/about-2', request.url))
  }
 
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }


// Implementar logica de deixar verificar o jwt com a senha 
}

export const config = {
    matcher: '/:path*',
}