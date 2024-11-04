"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/Icons"
import { SearchBar } from "./components/search-bar"
import { VehicleForm } from "./components/vehicle-form"
import { VehicleList } from "./components/vehicle-list"
import { useVehicles } from "./hooks/use-vehicles"
import type { Vehicle, VehicleFormData } from "./types"

// Import your mock data
import fordK from '../../public/FordK.jpeg'
import gol from '../../public/Gol.jpeg'
import uno from '../../public/Uno.jpg'

export default function VeiculosPage() {
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    vehicles,
    handleSearch,
    handleFilterChange,
    createVehicle,
    updateVehicle,
    deleteVehicle
  } = useVehicles([
    { id: "1", nome: "Fiat Uno", placa: "ABC-1234", disponivel: true, imagem: uno},
    { id: "2", nome: "Ford Ka", placa: "DEF-5678", disponivel: false, imagem: fordK },
    { id: "3", nome: "Volkswagen Gol", placa: "GHI-9012", disponivel: true, imagem: gol },
  ])

  const handleSubmit = (data: VehicleFormData) => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, data)
      setEditingVehicle(null)
    } else {
      createVehicle(data)
    }
    setIsDialogOpen(false)
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Icons.plus className="mr-2 h-4 w-4" /> Novo Veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? "Editar Veículo" : "Adicionar Novo Veículo"}
              </DialogTitle>
              <DialogDescription>
                {editingVehicle 
                  ? "Faça as alterações necessárias nos detalhes do veículo."
                  : "Preencha os detalhes do novo veículo aqui."
                }
              </DialogDescription>
            </DialogHeader>
            <VehicleForm 
              onSubmit={handleSubmit}
              initialData={editingVehicle || undefined}
            />
          </DialogContent>
        </Dialog>

        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </motion.div>

      <VehicleList 
        vehicles={vehicles}
        onEdit={handleEdit}
        onDelete={deleteVehicle}
      />
    </div>
  )
}
