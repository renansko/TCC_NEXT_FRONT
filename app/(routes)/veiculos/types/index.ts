import { z } from "zod"
import { vehicleSchema } from "../schemas"
import { StaticImageData } from "next/image"

export type VehicleFormData = z.infer<typeof vehicleSchema>

export interface Vehicle extends VehicleFormData {
  id: string
  imagem: string | StaticImageData
} 