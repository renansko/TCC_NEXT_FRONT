"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Cliente = {
  nome: string
  empresa: string
  cargo: string
  dataNascimento: Date
  foto: string
}

type Pedido = {
  numero: string
  data: Date
  status: "realizado" | "pendente" | "atrasado"
}

export default function Relatorios() {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula o carregamento de dados do cliente e pedidos
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simula dados do cliente
        setCliente({
          nome: "João Silva",
          empresa: "Tech Solutions",
          cargo: "Gerente de Projetos",
          dataNascimento: new Date(1985, 5, 15),
          foto: "/placeholder.svg"
        })

        // Simula dados dos pedidos
        setPedidos([
          { numero: "001", data: new Date(2023, 9, 1), status: "realizado" },
          { numero: "002", data: new Date(2023, 9, 5), status: "pendente" },
          { numero: "003", data: new Date(2023, 9, 10), status: "atrasado" },
          { numero: "004", data: new Date(2023, 9, 15), status: "realizado" },
          { numero: "005", data: new Date(2023, 9, 20), status: "pendente" },
        ])
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
        setError("Ocorreu um erro ao carregar os dados. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Relatórios</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {cliente && (
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={cliente.foto} alt={cliente.nome} />
                    <AvatarFallback>{cliente.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{cliente.nome}</h2>
                    <p className="text-sm text-gray-500">{cliente.empresa}</p>
                    <p className="text-sm text-gray-500">{cliente.cargo}</p>
                    <p className="text-sm text-gray-500">
                      Nascimento: {format(cliente.dataNascimento, "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
              <CardDescription>Visão geral dos últimos pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº do Pedido</TableHead>
                    <TableHead>Data do Pedido</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((pedido) => (
                    <TableRow key={pedido.numero}>
                      <TableCell>{pedido.numero}</TableCell>
                      <TableCell>{format(pedido.data, "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            pedido.status === "realizado"
                              ? "bg-green-100 text-green-800"
                              : pedido.status === "pendente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
