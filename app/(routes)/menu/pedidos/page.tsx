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
import { useToast } from "@/hooks/use-toast"
import { mockItems } from "./mock/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createOrder } from "./services/order-service"

export default function PedidosPage() {
  const [orders, setOrders] = useState<OrderItemFormData[]>([])
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleOrderSubmit = async (data: OrderFormData) => {
    try {
      setIsLoading(true)
      
      const selectedItem = mockItems.find(item => item.id === data.itemId)
      
      if (!selectedItem) {
        throw new Error("Item não encontrado")
      }
      
      const response = await createOrder({
        ...data,
      })

      handleOrderItemSubmit({
        name: selectedItem.name,
        description: selectedItem.description,
        quantity: selectedItem.quantity,
        amount: selectedItem.amount,
        weight: selectedItem.weight,
      })

      toast({
        title: "Sucesso",
        description: `Pedido ${response.order.orderNumber} criado com sucesso!`,
      })
      
      setIsOrderModalOpen(false)
      
    } catch (error) {
      console.error('Order submission error:', error)
      toast({
        title: "Erro",
        description: error instanceof Error 
          ? `Erro ao criar pedido: ${error.message}` 
          : "Erro ao criar pedido. Verifique se o servidor está rodando.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrderItemSubmit = (data: OrderItemFormData) => {
    setOrders([...orders, data])
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
                  <OrderForm onSubmit={handleOrderSubmit} isLoading={isLoading} />
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
      <Tabs defaultValue="orders" className="space-y-4 mt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="items">Itens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <OrderItemList orders={orders} />
        </TabsContent>
        
        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Itens</CardTitle>
              <CardDescription>
                Gerencie todos os itens disponíveis no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conteúdo da aba de itens será implementado em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
