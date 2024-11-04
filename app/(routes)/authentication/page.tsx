"use client"

import Link from "next/link"
import { UserAuthForm } from "./components/use-auth-form"
import { Icons } from "@/components/ui/Icons"


export default function AuthenticationPage() {
  return (
    <div className="container relative h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#D2B48C]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo />
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
              href="/authentication/registrar-empresa"
              className="underline underline-offset-4 hover:text-primary"
            >
              Cadastrar como Empresa
            </Link>
            {" ou "}
            <Link
              href="/authentication/registrar-usuario"
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