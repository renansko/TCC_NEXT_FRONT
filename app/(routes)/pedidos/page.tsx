"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Schema de validação para o pedido
const orderSchema = z.object({
  itemId: z.string().min(1, "ID do item é obrigatório"),
  userId: z.string().min(1, "ID do usuário é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  dateRequested: z.date(),
  dateDelivery: z.date(),
  deliveryAddress: z.string().min(1, "Endereço de entrega é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
})

// Schema de validação para o item do pedido
const orderItemSchema = z.object({
  name: z.string().min(1, "Nome do item é obrigatório"),
  description: z.string().min(1, "Descrição do item é obrigatória"),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  amount: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  weight: z.number().min(0, "Peso deve ser maior ou igual a zero"),
})

export default function Component() {
  const [orderItems, setOrderItems] = useState<{ name: string; description: string; quantity: number; amount: number; weight: number }[]>([])

  // Formulário de pedido
  const orderForm = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      itemId: "",
      userId: "",
      name: "",
      dateRequested: new Date(),
      dateDelivery: new Date(),
      deliveryAddress: "",
      status: "Pendente",
    },
  })

  // Formulário de item do pedido
  const orderItemForm = useForm({
    resolver: zodResolver(orderItemSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1,
      amount: 0,
      weight: 0,
    },
  })

  const onOrderSubmit = (data: z.infer<typeof orderSchema>) => {
    console.log("Pedido submetido:", data)
    // Aqui você pode enviar os dados para sua API
  }

  const onOrderItemSubmit = (data: z.infer<typeof orderItemSchema>) => {
    console.log("Item do pedido submetido:", data)
    setOrderItems([...orderItems, data])
    orderItemForm.reset()
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Pedido</CardTitle>
          <CardDescription>Preencha os dados do pedido</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...orderForm}>
            <form onSubmit={orderForm.handleSubmit(onOrderSubmit)} className="space-y-4">
              <FormField
                control={orderForm.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Item</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Usuário</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="dateRequested"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do Pedido</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-[240px] pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="dateDelivery"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Entrega</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-[240px] pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço de Entrega</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Cadastrar Pedido</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Item do Pedido</CardTitle>
          <CardDescription>Adicione itens ao pedido</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...orderItemForm}>
            <form onSubmit={orderItemForm.handleSubmit(onOrderItemSubmit)} className="space-y-4">
              <FormField
                control={orderItemForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Item</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderItemForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Item</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderItemForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderItemForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderItemForm.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.1"
                        min="0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Adicionar Item</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {orderItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Itens do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {orderItems.map((item, index) => (
                <li key={index} className="border p-2 rounded">
                  <strong>{item.name}</strong> - Quantidade: {item.quantity}, Valor: R${item.amount}, Peso: {item.weight}kg
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
