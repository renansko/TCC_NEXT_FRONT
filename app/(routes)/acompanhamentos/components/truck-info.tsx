"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/Icons"
import type { TruckData } from "../types"
import { format } from "date-fns"

interface TruckInfoProps {
  truck: TruckData
}

export function TruckInfo({ truck }: TruckInfoProps) {
  const progressPercent = (truck.rota.distanciaPercorrida / truck.rota.distanciaTotal) * 100

  return (
    <div className="grid gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informações do Veículo</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.truck className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{truck.modelo}</span>
              </div>
              <span className="text-sm">{truck.placa}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.user className="h-4 w-4 text-muted-foreground" />
                <span>{truck.motorista}</span>
              </div>
              <span className={`text-sm font-medium ${
                truck.status === 'em_rota' ? 'text-green-500' :
                truck.status === 'parado' ? 'text-yellow-500' :
                truck.status === 'manutencao' ? 'text-red-500' :
                'text-blue-500'
              }`}>
                {truck.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Combustível</span>
                <span>{truck.combustivel}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${truck.combustivel}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso da Rota</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informações do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pedido #{truck.pedido.numero}</span>
              <span className={`text-sm font-medium ${
                truck.pedido.status === 'em_andamento' ? 'text-blue-500' :
                truck.pedido.status === 'entregue' ? 'text-green-500' :
                'text-red-500'
              }`}>
                {truck.pedido.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cliente</span>
                <span>{truck.pedido.cliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tempo em Rota</span>
                <span>{truck.pedido.tempoPercurso} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tempo Estimado</span>
                <span>{truck.pedido.tempoEstimado} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saída</span>
                <span>{format(truck.rota.horaSaida, "HH:mm")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chegada Prevista</span>
                <span>{format(truck.rota.horaPrevisaoChegada, "HH:mm")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 