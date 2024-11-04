"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/Icons"
import { OrderForm } from "./components/order-form"
import { OrderItemForm } from "./components/order-item-form"
import { OrderItemList } from "./components/order-item-list"
import type { OrderFormData, OrderItemFormData } from "./types"

export default function PedidosPage() {
  const [orderItems, setOrderItems] = useState<OrderItemFormData[]>([])
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)

  const handleOrderSubmit = (data: OrderFormData) => {
    console.log("Pedido submetido:", data)
    setIsOrderModalOpen(false)
  }

  const handleOrderItemSubmit = (data: OrderItemFormData) => {
    setOrderItems([...orderItems, data])
    setIsItemModalOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icons.squareTerminal className="h-6 w-6" />
                    Novo Pedido
                  </CardTitle>
                  <CardDescription>
                    Cadastre um novo pedido no sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Clique para adicionar um novo pedido com todas as informações necessárias.
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Cadastro de Pedido</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo pedido
                </DialogDescription>
              </DialogHeader>
              <OrderForm onSubmit={handleOrderSubmit} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Dialog open={isItemModalOpen} onOpenChange={setIsItemModalOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icons.package className="h-6 w-6" />
                    Novo Item
                  </CardTitle>
                  <CardDescription>
                    Adicione um novo item ao pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Clique para adicionar um novo item com suas especificações.
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Cadastro de Item</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo item
                </DialogDescription>
              </DialogHeader>
              <OrderItemForm onSubmit={handleOrderItemSubmit} />
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      <OrderItemList items={orderItems} />
    </div>
  )
}
