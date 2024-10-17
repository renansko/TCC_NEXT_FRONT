"use client"

import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navegue pelas opções do sistema
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-6">
              <ul className="space-y-4">
                <li>
                  <a href="/menu"><Button variant="ghost" className="w-full justify-start">Início</Button></a>
                </li>
                <li>
                  <a href="/configuracoes"><Button variant="ghost" className="w-full justify-start">Configurações</Button></a>
                </li>
                <li>
                  <a href="/relatorios"><Button variant="ghost" className="w-full justify-start">Relatórios</Button></a>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Minha Aplicação</h1>
          <ThemeToggle />
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/pedidos"><Button variant="ghost">Pedidos</Button></a>
            </li>
            <li>
              <a href="/veiculos"><Button variant="ghost">Veículos</Button></a>
            </li>
            <li>
              <a href="/clientes"><Button variant="ghost">Clientes</Button></a>
            </li>
            <li>
              <a href="/acompanhamentos"><Button variant="ghost">Acompanhamento</Button></a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}