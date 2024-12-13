"use client"

import { useForm, Controller } from "react-hook-form"
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
import { orderSchema } from "@/app/(routes)/menu/pedidos/schemas"
    import type { OrderFormData } from "@/app/(routes)/menu/pedidos/types"
import { Icons } from "@/components/ui/Icons"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useEffect } from "react"
import { useMapsLibrary } from "@/hooks/use-maps-library"
import { AddressSearch } from "./address-search"
import type { AddressDetails } from "../types/google-places"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { mockItems } from "../mock/data"

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void
  isEditing?: boolean
  initialData?: OrderFormData
}

export function OrderForm({ onSubmit, isEditing, initialData }: OrderFormProps) {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      itemId: initialData?.itemId || "",
      userId: initialData?.userId || "",
      originAddress: initialData?.originAddress || "",
      deliveryAddress: initialData?.deliveryAddress || "",
      status: initialData?.status || "Pendente",
      dateRequested: initialData?.dateRequested || new Date(),
      dateDelivery: initialData?.dateDelivery || new Date(),
      transferId: initialData?.transferId || "",
      orderNumber: initialData?.orderNumber || "",
      name: initialData?.name || "",
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: initialData?.updatedAt || new Date(),
    },
  })

  const maps = useMapsLibrary('places')

  // Handle address selection with coordinates
  const handleAddressSelect = (fieldName: keyof OrderFormData) => {
    return (address: string, details?: AddressDetails) => {
      form.setValue(fieldName, address)

      // If we have geometry details, update coordinates
      if (details?.geometry?.location) {
        const { lat, lng } = details.geometry.location
        // You might want to store these coordinates in your form data
        // form.setValue(`${fieldName}Coordinates`, { lat, lng })
        console.log(`${fieldName} coordinates:`, { lat, lng })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} - {item.weight}kg
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Cliente 1</SelectItem>
                  <SelectItem value="2">Cliente 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateRequested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data do Pedido</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline">
                      {field.value ? format(field.value, "dd/MM/yyyy") : "Selecione uma data"}
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

        <Controller
          name="originAddress"
          control={form.control}
          rules={{ required: "Endereço de origem é obrigatório" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Endereço de Origem</FormLabel>
              <FormControl>
                <AddressSearch
                  label="Endereço de Origem"
                  placeholder="Digite o endereço de origem"
                  field={field}
                  error={fieldState.error}
                  onAddressSelect={handleAddressSelect("originAddress")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          name="deliveryAddress"
          control={form.control}
          rules={{ required: "Endereço de entrega é obrigatório" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Endereço de Entrega</FormLabel>
              <FormControl>
                <AddressSearch
                  label="Endereço de Entrega"
                  placeholder="Digite o endereço de entrega"
                  field={field}
                  error={fieldState.error}
                  onAddressSelect={handleAddressSelect("deliveryAddress")}
                />
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