import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Tratuk",
  description: "Faça login na plataforma Tratuk para rastrear seus caminhões e gerenciar suas entregas.",
  keywords: ["rastreamento", "caminhões", "logística", "transporte", "gestão de frota"],
}

interface AuthenticationLayoutProps {
  children: React.ReactNode
}

export default function AuthenticationLayout({ children }: AuthenticationLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
