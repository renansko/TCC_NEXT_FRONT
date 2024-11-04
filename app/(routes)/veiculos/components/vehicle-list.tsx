"use client"

import { motion, AnimatePresence } from "framer-motion"
import { VehicleCard } from "./vehicle-card"
import type { Vehicle } from "../types"

interface VehicleListProps {
  vehicles: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: string) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function VehicleList({ vehicles, onEdit, onDelete }: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <p className="text-muted-foreground">Nenhum veículo encontrado</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
} 