import { z } from "zod"
import { orderSchema, orderItemSchema } from "../schemas"

export interface OrderFormData {
  itemId: string
  userId: string
  name: string
  dateRequested: Date
  dateDelivery: Date
  originAddress: string
  // Optional: store coordinates
  originCoordinates?: {
    lat: number
    lng: number
  }
  deliveryAddress: string
  // Optional: store coordinates
  deliveryCoordinates?: {
    lat: number
    lng: number
  }
  status: string
}

export type OrderItemFormData = z.infer<typeof orderItemSchema> 