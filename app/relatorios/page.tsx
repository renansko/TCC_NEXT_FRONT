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
  name: string
  company: string
  role: string
  birth: Date
  attachments: string
}

type order = {
  id: string
  dateRequested: Date
  status: "realizado" | "pendente" | "atrasado"
}

export default function Relatorios() {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [orders, setOrders] = useState<order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3400/order/Prefeito'); // Substitua pela URL da sua API
        console.log(response)
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        setOrders(data);

        // Simula o carregamento de dados do cliente e orders
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simula dados do cliente
        setCliente({
          name: "João Silva",
          company: "Tech Solutions",
          role: "Gerente de Projetos",
          birth: new Date(1985, 5, 15),
          attachments: "/placeholder.svg"
        })

        // Simula dados dos orders
        // setorders([
        //   { id: "001", dateRequested: new Date(2023, 9, 1), status: "realizado" },
        //   { id: "002", dateRequested: new Date(2023, 9, 5), status: "pendente" },
        //   { id: "003", dateRequested: new Date(2023, 9, 10), status: "atrasado" },
        //   { id: "004", dateRequested: new Date(2023, 9, 15), status: "realizado" },
        //   { id: "005", dateRequested: new Date(2023, 9, 20), status: "pendente" },
        // ])
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
                    <AvatarImage src={cliente.attachments} alt={cliente.name} />
                    <AvatarFallback>{cliente.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{cliente.name}</h2>
                    <p className="text-sm text-gray-500">{cliente.company}</p>
                    <p className="text-sm text-gray-500">{cliente.role}</p>
                    <p className="text-sm text-gray-500">
                      Nascimento: {format(cliente.birth, "dd/MM/yyyy")}
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
                    <TableHead>Nº do pedido</TableHead>
                    <TableHead>Data do pedido</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{format(order.dateRequested, "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "realizado"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pendente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
