import { z } from "zod"
import { orderSchema } from "../schemas"

export interface OrderResponse {
  id: string
  itemId: string
  userId: string
  orderNumber: string
  name: string
  transferId: string
  dateRequested: Date
  dateDelivery: Date
  deliveryAddress: string
  outgoingAddress: string
  status: string
  createdAt: Date
  updatedAt: Date
  item?: {
    name: string
    description: string
    quantity: number
    amount: number
    weight: number
    createdAt: Date
    }
    user?: {
    name: string
    email: string
    phone: string
    birth: Date
    role: string
    }
    transfer?: {
      name: string
      model: string
      plate: string
      status: string
      companyId: string
    driverId: string
    }
} 

export type OrderFormData = z.infer<typeof orderSchema>
export type OrderItemFormData = z.infer<typeof orderItemSchema> 