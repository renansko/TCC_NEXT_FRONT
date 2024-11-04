"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TruckSelector } from "./components/truck-selector"
import { TruckInfo } from "./components/truck-info"
import { TrackingMap } from "./components/tracking-map"
import { mockTrucks, simulateRealTimeUpdate } from "./data/mock"
import type { TruckData } from "./types"

export default function AcompanhamentoPage() {
  const [trucks, setTrucks] = useState<TruckData[]>(mockTrucks)
  const [selectedTruckId, setSelectedTruckId] = useState(trucks[0]?.id)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prevTrucks => 
        prevTrucks.map(truck => 
          truck.status === "em_rota" ? simulateRealTimeUpdate(truck) : truck
        )
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const selectedTruck = trucks.find(truck => truck.id === selectedTruckId)
  if (!selectedTruck) return null

  return (
    <div className="container mx-auto p-4 w-[calc(100svw-19em)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Acompanhamento de Frota</h1>
      </motion.div>

      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full overflow-hidden"
        >
          <TruckSelector
            trucks={trucks}
            selectedTruckId={selectedTruckId}
            onSelectTruck={setSelectedTruckId}
          />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-1"
          >
            <TruckInfo truck={selectedTruck} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-3 h-[600px] rounded-lg overflow-hidden"
          >
            <TrackingMap truck={selectedTruck} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}