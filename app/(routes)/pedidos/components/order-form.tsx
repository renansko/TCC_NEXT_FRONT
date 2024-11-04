"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DialogClose } from "@/components/ui/dialog"
import { orderSchema } from "@/app/(routes)/pedidos/schemas"
    import type { OrderFormData } from "@/app/(routes)/pedidos/types"
import { Icons } from "@/components/ui/Icons"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void
}

export function OrderForm({ onSubmit }: OrderFormProps) {
  const form = useForm<OrderFormData>({
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
        control={form.control}
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
        control={form.control}
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
        control={form.control}
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
                    <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
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
        control={form.control}
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
                    <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
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
        control={form.control}
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
        control={form.control}
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
      <div className="flex justify-end gap-3">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Cadastrar Pedido</Button>
      </div>
    </form>
  </Form>
  )
} 