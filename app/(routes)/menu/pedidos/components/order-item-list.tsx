"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/Icons"
import type { OrderItemFormData } from "@/app/(routes)/menu/pedidos/types"

interface OrderItemListProps {
  items: OrderItemFormData[]
}

export function OrderItemList({ items }: OrderItemListProps) {
  if (!items.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.list className="h-5 w-5" />
            Itens do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                key={index}
                className="border p-3 rounded-lg flex items-center justify-between hover:bg-accent/50 transition-colors"
              >
                <div>
                  <strong>{item.name}</strong>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span>Qtd: {item.quantity}</span>
                  <span>R$ {item.amount}</span>
                  <span>{item.weight}kg</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
} 