"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { User, Building2, Calendar } from "lucide-react"

type Cliente = {
  id: string
  nome: string
  empresa: string
  isAdmin: boolean
  dataNascimento: Date
  avatar: string
}

type Pedido = {
  id: string
  numeroPedido: string
  dataPedido: Date
  status: "concluido" | "cancelado" | "Em rota de entrega"
}

const clienteMock: Cliente = {
  id: "1",
  nome: "João Silva",
  empresa: "Tech Solutions",
  isAdmin: true,
  dataNascimento: new Date(1985, 5, 15),
  avatar: "/placeholder.svg"
}

const pedidosMock: Pedido[] = [
  { id: "1", numeroPedido: "PED001", dataPedido: new Date(2023, 9, 1), status: "concluido" },
  { id: "2", numeroPedido: "PED002", dataPedido: new Date(2023, 9, 5), status: "cancelado" },
  { id: "3", numeroPedido: "PED003", dataPedido: new Date(2023, 9, 10), status: "Em rota de entrega" },
  { id: "4", numeroPedido: "PED004", dataPedido: new Date(2023, 9, 15), status: "concluido" },
  { id: "5", numeroPedido: "PED005", dataPedido: new Date(2023, 9, 20), status: "Em rota de entrega" },
]

export default function Clientes() {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    // Simula o carregamento de dados do cliente e pedidos
    const fetchData = async () => {
      // Aqui você faria a chamada real para sua API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCliente(clienteMock)
      setPedidos(pedidosMock)
    }

    fetchData()
  }, [])

  if (!cliente) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Detalhes do Cliente</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={cliente.avatar} alt={cliente.nome} />
                <AvatarFallback>{cliente.nome.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-semibold">{cliente.nome}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>{cliente.empresa}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(cliente.dataNascimento, "dd/MM/yyyy")}</span>
                </div>
                <Badge variant={cliente.isAdmin ? "success" : "default"}>
                  {cliente.isAdmin ? "Administrador" : "Usuário"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Pedido</TableHead>
                    <TableHead>Data do Pedido</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.numeroPedido}</TableCell>
                      <TableCell>{format(pedido.dataPedido, "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            pedido.status === "concluido"
                              ? "success"
                              : pedido.status === "cancelado"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {pedido.status}
                        </Badge>
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
