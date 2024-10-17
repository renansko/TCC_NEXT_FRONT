"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Package, Users, MapPin, ChevronRight } from "lucide-react"

const menuItems = [
  {
    title: "Pedidos",
    description: "Gerencie e acompanhe todos os pedidos",
    icon: Package,
    color: "bg-blue-500",
    link: "/pedidos",
    stats: {
      total: 150,
      pending: 30,
    },
  },
  {
    title: "Veículos",
    description: "Controle sua frota de veículos",
    icon: Truck,
    color: "bg-green-500",
    link: "/veiculos",
    stats: {
      total: 25,
      active: 18,
    },
  },
  {
    title: "Clientes",
    description: "Gerencie informações dos clientes",
    icon: Users,
    color: "bg-purple-500",
    link: "/clientes",
    stats: {
      total: 500,
      new: 50,
    },
  },
  {
    title: "Acompanhamento",
    description: "Acompanhe entregas em tempo real",
    icon: MapPin,
    color: "bg-red-500",
    link: "/acompanhamento",
    stats: {
      active: 15,
      completed: 85,
    },
  },
]

export default function MenuPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Menu Principal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="text-white" size={24} />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-center">
                    {Object.entries(item.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-sm text-muted-foreground">{key}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={item.link} passHref>
                    <Button className="w-full">
                      Ir para {item.title}
                      <motion.div
                        animate={{ x: hoveredIndex === index ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}