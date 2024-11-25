import { z } from "zod"
import { clientSchema } from "../schemas"

export type ClientFormData = z.infer<typeof clientSchema>

export interface Client extends ClientFormData {
  id: string
  avatar: string
}

export type OrderStatus = "concluido" | "cancelado" | "Em rota de entrega"

export interface Order {
  id: string
  numeroPedido: string
  dataPedido: Date
  status: OrderStatus
  clientId: string
} 