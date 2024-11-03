"use client"

import Link from "next/link"
import { UserAuthForm } from "./components/use-auth-form"

// Truck icon component - moved to a separate component since it's static
const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-6 w-6"
  >
    <path d="M4 12h16" />
    <path d="M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
    <circle cx="8" cy="16" r="2" />
    <circle cx="16" cy="16" r="2" />
    <path d="M4 12V8l4-4" />
    <path d="M20 12V8l-4-4" />
    <path d="M12 4v8" />
  </svg>
)

export default function AuthenticationPage() {
  return (
    <div className="container relative h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#D2B48C]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <TruckIcon />
          Tratuk - Rastreie seus Caminhões
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Bem-vindo à nossa plataforma. Faça login para acessar sua conta.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite suas credenciais abaixo para entrar
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link
              href="/register-empresa"
              className="underline underline-offset-4 hover:text-primary"
            >
              Cadastrar como Empresa
            </Link>
            {" ou "}
            <Link
              href="/register-usuario"
              className="underline underline-offset-4 hover:text-primary"
            >
              Cadastrar como Usuário
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}