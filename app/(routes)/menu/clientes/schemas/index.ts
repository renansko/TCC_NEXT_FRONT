import * as z from "zod"

export const clientSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  empresa: z.string().min(1, "Empresa é obrigatória"),
  email: z.string().email("Email inválido"),
  dataNascimento: z.date(),
  isAdmin: z.boolean(),
  avatar: z.any() // We'll handle file validation separately
}) 