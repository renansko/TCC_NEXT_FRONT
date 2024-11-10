"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/ui/Icons"
import type { TruckData } from "../types"

interface TruckSelectorProps {
  trucks: TruckData[]
  selectedTruckId: string
  onSelectTruck: (id: string) => void
}

export function TruckSelector({ trucks, selectedTruckId, onSelectTruck }: TruckSelectorProps) {
  
  return (
    <div className="sticky top-4 z-10">
      <div 
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/20 
          scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors"
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
          }
        }}
      >
        {trucks.map((truck) => (
          <motion.div
            key={truck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`w-[280px] cursor-pointer transition-colors ${
                selectedTruckId === truck.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelectTruck(truck.id);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${
                    truck.status === 'em_rota' ? 'bg-green-500/20 text-green-500' :
                    truck.status === 'parado' ? 'bg-yellow-500/20 text-yellow-500' :
                    truck.status === 'manutencao' ? 'bg-red-500/20 text-red-500' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    <Icons.truck className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{truck.placa}</p>
                    <p className="text-sm text-muted-foreground">{truck.motorista}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {Math.round(truck.rota.distanciaPercorrida)} km
                    </p>
                    <p className="text-xs text-muted-foreground">percorridos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}