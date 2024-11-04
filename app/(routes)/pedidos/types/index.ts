import { z } from "zod"
import { orderSchema, orderItemSchema } from "../schemas"

export type OrderFormData = z.infer<typeof orderSchema>
export type OrderItemFormData = z.infer<typeof orderItemSchema> 