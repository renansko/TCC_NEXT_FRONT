"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, MenuIcon, TrashIcon } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Schema de validação para o pedido
const orderSchema = z.object({
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

// Tipo para o usuário
type User = {
  id: string;
  name: string;
}

// Tipo para o item do pedido
type OrderItem = z.infer<typeof orderItemSchema>

export default function Component() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Formulário de pedido
  const orderForm = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
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
    console.log("Pedido submetido:", { ...data, items: orderItems })
    // Aqui você pode enviar os dados para sua API
  }

  const onOrderItemSubmit = (data: OrderItem) => {
    setOrderItems([...orderItems, data])
    orderItemForm.reset()
  }

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  // Função para buscar usuários
  const searchUsers = async (name: string) => {
    try {
      const response = await fetch(`/user/${name}`)
      if (!response.ok) {
        throw new Error('Falha ao buscar usuários')
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  // Efeito para buscar usuários quando o termo de busca muda
  useEffect(() => {
    if (searchTerm) {
      searchUsers(searchTerm)
    }
  }, [searchTerm])

  // Simula o carregamento da página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
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
                    <Button variant="ghost" className="w-full justify-start">Início</Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">Configurações</Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">Relatórios</Button>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost">Pedidos</Button>
              </li>
              <li>
                <Button variant="ghost">Veículos</Button>
              </li>
              <li>
                <Button variant="ghost">Clientes</Button>
              </li>
              <li>
                <Button variant="ghost">Acompanhamento</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
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
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Buscar usuário"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um usuário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={orderForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Pedido</FormLabel>
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
              <CardTitle>Adicionar Item ao Pedido</CardTitle>
              <CardDescription>Preencha os dados do item</CardDescription>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Peso</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>R${item.amount.toFixed(2)}</TableCell>
                        <TableCell>{item.weight}kg</TableCell>
                        <TableCell>
                          <Button variant="destructive" size="sm" onClick={() => removeOrderItem(index)}>
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
