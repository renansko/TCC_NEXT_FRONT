"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DialogClose } from "@/components/ui/dialog"
import { Icons } from "@/components/ui/Icons"
import { vehicleSchema } from "../schemas"
import type { VehicleFormData } from "../types"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"

interface VehicleFormProps {
  onSubmit: (data: VehicleFormData) => void
  initialData?: Partial<VehicleFormData>
}

export function VehicleForm({ onSubmit, initialData }: VehicleFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      nome: initialData?.nome || "",
      placa: initialData?.placa || "",
      disponivel: initialData?.disponivel ?? true,
      imagem: initialData?.imagem || null,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        form.setValue("imagem", file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Veículo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Fiat Uno" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="placa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placa</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ABC-1234" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disponivel"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Veículo disponível
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagem"
          render={({ field: {  ...field } }) => (
            <FormItem>
              <FormLabel>Imagem do Veículo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => document.getElementById('image-input')?.click()}
                          >
                            <Icons.upload className="mr-2 h-4 w-4" />
                            Escolher Imagem
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Selecione uma imagem do veículo
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...field}
                      onChange={handleImageChange}
                    />
                  </div>
                  {previewImage && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">
            {initialData ? "Salvar Alterações" : "Adicionar Veículo"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 