import { z } from "zod"

export const orderSchema = z.object({
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
  transferId: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  dateRequested: z.date(),
  dateDelivery: z.date(),
  deliveryAddress: z.string().min(1, "Endereço de entrega é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
}) 