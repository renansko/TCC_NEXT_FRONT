"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/ui/Icons"
import Image from "next/image"
import type { Vehicle } from "../types"

interface VehicleCardProps {
  vehicle: Vehicle
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: string) => void
}

export function VehicleCard({ vehicle, onEdit, onDelete }: VehicleCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col"
    >
      <Card className="h-full flex flex-col">
        <div className="relative aspect-video">
          <Image 
            src={vehicle.imagem}
            alt={vehicle.nome}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            vehicle.disponivel ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {vehicle.disponivel ? 'Disponível' : 'Indisponível'}
          </div>
        </div>
        <CardContent className="flex-grow p-4">
          <h2 className="text-xl font-semibold mb-2">{vehicle.nome}</h2>
          <p className="text-muted-foreground">Placa: {vehicle.placa}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(vehicle)}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onDelete(vehicle.id)}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 