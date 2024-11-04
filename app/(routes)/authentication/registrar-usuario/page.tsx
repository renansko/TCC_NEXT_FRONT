"use client"

import * as React from "react"
import { Icons } from "@/components/ui/Icons"
import { RegisterForm } from "../components/register-form"
import Link from "next/link"

export default function RegisterUsuarioPage() {
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
              Tenha total gestão e controle de suas cargas e mercadorias
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <Link href="/">
          <Icons.back />
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastre-se como Usuário
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para criar sua conta pessoal
            </p>
          </div>
          <RegisterForm type="usuario" />
        </div>
      </div>
    </div>
  )
} 