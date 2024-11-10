"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/Icons"
import React from "react"

const menuItems = [
  {
    title: "Pedidos",
    description: "Gerencie e acompanhe todos os pedidos",
    icon: "package",
    color: "bg-blue-500/20 text-blue-500",
    link: "/menu/pedidos",
    stats: [
      { label: "Total", value: 150 },
      { label: "Pendentes", value: 30 },
    ],
  },
  {
    title: "Veículos",
    description: "Controle sua frota de veículos",
    icon: "truck",
    color: "bg-green-500/20 text-green-500",
    link: "/menu/veiculos",
    stats: [
      { label: "Total", value: 25 },
      { label: "Ativos", value: 18 },
    ],
  },
  {
    title: "Clientes",
    description: "Gerencie informações dos clientes",
    icon: "user",
    color: "bg-purple-500/20 text-purple-500",
    link: "/menu/clientes",
    stats: [
      { label: "Total", value: 500 },
      { label: "Novos", value: 50 },
    ],
  },
  {
    title: "Acompanhamento",
    description: "Acompanhe entregas em tempo real",
    icon: "map",
    color: "bg-red-500/20 text-red-500",
    link: "/menu/acompanhamentos",
    stats: [
      { label: "Em rota", value: 15 },
      { label: "Concluídos", value: 85 },
    ],
  },
]

export default function MenuPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">Bem-vindo ao Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Selecione uma das opções abaixo para começar
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group"
          >
            <Link href={item.link} className="block h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 
                    transition-transform group-hover:scale-110`}>
                    {Icons[item.icon as keyof typeof Icons] && (
                      React.createElement(Icons[item.icon as keyof typeof Icons], {
                        className: "size-6"
                      })
                    )}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    {item.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-muted/50 rounded-lg p-3 text-center transition-colors
                          hover:bg-muted"
                      >
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full group" variant="ghost">
                    <span>Acessar {item.title}</span>
                    <motion.div
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icons.chevronRight className="ml-2 h-4 w-4 transition-transform 
                        group-hover:translate-x-1" />
                    </motion.div>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}