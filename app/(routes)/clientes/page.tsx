"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/Icons"
import { ClientNav } from "./components/client-nav"
import { ClientCard } from "./components/client-card"
import { OrdersTable } from "./components/orders-table"
import { ClientForm } from "./components/client-form"
import { mockClients, mockOrders } from "./data/mock"
import type { Client, ClientFormData, Order } from "./types"

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const selectedClient = clients.find(client => client.id === selectedClientId)
  const clientOrders = mockOrders.filter(order => order.clientId === selectedClientId)

  const handleCreateClient = (data: ClientFormData) => {
    const newClient = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      avatar: data.avatar instanceof File 
        ? URL.createObjectURL(data.avatar) 
        : "/avatars/default.jpg"
    }
    setClients(prev => [...prev, newClient])
    setSelectedClientId(newClient.id)
    setIsDialogOpen(false)
  }

  const handleUpdateClient = (data: ClientFormData) => {
    if (editingClient) {
      setClients(prev => prev.map(client => 
        client.id === editingClient.id
          ? {
              ...client,
              ...data,
              avatar: data.avatar instanceof File 
                ? URL.createObjectURL(data.avatar) 
                : client.avatar
            }
          : client
      ))
      setEditingClient(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id))
    if (selectedClientId === id) {
      setSelectedClientId(clients.find(client => client.id !== id)?.id || "")
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsDialogOpen(true)
  }

  if (!selectedClient) return null

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Editar Cliente" : "Adicionar Novo Cliente"}
              </DialogTitle>
              <DialogDescription>
                {editingClient 
                  ? "Faça as alterações necessárias nos detalhes do cliente."
                  : "Preencha os detalhes do novo cliente aqui."
                }
              </DialogDescription>
            </DialogHeader>
            <ClientForm 
              onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
              initialData={editingClient || undefined}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ClientNav 
        clients={clients}
        selectedClientId={selectedClientId}
        onSelectClient={setSelectedClientId}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div
          key={selectedClientId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ClientCard
            client={selectedClient}
            onEdit={handleEdit}
            onDelete={handleDeleteClient}
          />
        </motion.div>

        <motion.div
          key={`orders-${selectedClientId}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <OrdersTable orders={clientOrders} />
        </motion.div>
      </div>
    </div>
  )
}
