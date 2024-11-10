import * as z from "zod"

export const vehicleSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  placa: z.string()
    .min(1, "Placa é obrigatória")
    .regex(/^[A-Z]{3}-[0-9]{4}$/, "Placa deve estar no formato ABC-1234"),
  disponivel: z.boolean(),
  imagem: z.any() // We'll handle file validation separately
}) 