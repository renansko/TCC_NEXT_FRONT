"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    // Simula uma chamada de autenticação
    setTimeout(() => {
      console.log("Email:", email)
      console.log("Password:", password)

      // Suponha que a autenticação foi bem-sucedida
      setLoading(false)
      router.push("/menu")
    }, 2000) // Simula um atraso de 2 segundos
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[720px] bg-[#D2B48C]">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-left block pl-5">
                Email:
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[50px] bg-white pl-5 font-poppins rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-left block pl-5">
                Senha:
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[50px] bg-white pl-5 font-poppins rounded-lg"
              />
            </div>
            <Button
              type="submit"
              className="w-[260px] h-[40px] bg-[#5FFFC7] text-black font-poppins rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <CardDescription>Ainda não tem cadastro?</CardDescription>
          <Button
            onClick={() => router.push("/register-empresa")}
            className="w-[260px] h-[40px] bg-[#5FFFC7] text-black font-poppins rounded-lg"
          >
            Registrar-se empresa
          </Button>
          <Button
            onClick={() => router.push("/register-usuario")}
            className="w-[260px] h-[40px] bg-[#5FFFC7] text-black font-poppins rounded-lg"
          >
            Registrar-se usuario
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}