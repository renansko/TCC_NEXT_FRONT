import { z } from "zod"

export const orderSchema = z.object({
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
  transferId: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  dateRequested: z.date(),
  dateDelivery: z.date(),
  originAddress: z.string().min(1, "Endereço de origem é obrigatório"),
  deliveryAddress: z.string().min(1, "Endereço de entrega é obrigatório"),
  orderNumber: z.string().min(1, "Número do pedido é obrigatório"),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.string().min(1, "Status é obrigatório"),
}) 