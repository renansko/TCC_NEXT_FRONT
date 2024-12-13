import * as z from "zod"

export const orderSchema = z.object({
  itemId: z.string().min(1, "ID do item é obrigatório"),
  userId: z.string().min(1, "ID do usuário é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  dateRequested: z.date(),
  dateDelivery: z.date(),
  deliveryAddress: z.string().min(1, "Endereço de entrega é obrigatório"),
  originAddress: z.string().min(1, "Endereço de origem é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
})

export const orderItemSchema = z.object({
  name: z.string().min(1, "Nome do item é obrigatório"),
  description: z.string().min(1, "Descrição do item é obrigatória"),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  amount: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  weight: z.number().min(0, "Peso deve ser maior ou igual a zero"),
}) 