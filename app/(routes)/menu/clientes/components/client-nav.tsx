"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/Icons"
import { useDebounce } from "@/hooks/use-debounce"
import type { Client } from "../types"

interface ClientNavProps {
  clients: Client[]
  selectedClientId: string
  onSelectClient: (clientId: string) => void
}

export function ClientNav({ clients, selectedClientId, onSelectClient }: ClientNavProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 300)

  const filteredClients = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase()
    if (!searchLower) return clients

    return clients.filter(client => 
      client.nome.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.empresa.toLowerCase().includes(searchLower)
    )
  }, [clients, debouncedSearch])

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <motion.div 
        initial={false}
        animate={{ height: isSearchOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <div className="relative">
          <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 mb-2"
          />
        </div>
      </motion.div>

      <div className="flex items-center justify-between px-2">
        <span className="text-sm font-medium text-muted-foreground">
          {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 hover:bg-accent rounded-full"
        >
          <Icons.search className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 px-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {filteredClients.map((client) => (
            <motion.button
              key={client.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectClient(client.id)}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors flex-shrink-0 group ${
                selectedClientId === client.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              <Avatar className="h-8 w-8 border-2 border-transparent group-hover:border-primary">
                <AvatarImage src={client.avatar} alt={client.nome} />
                <AvatarFallback className={`${selectedClientId === client.id ? "bg-primary-foreground text-primary" : "bg-muted text-muted-foreground"}`}>
                  {client.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium whitespace-nowrap ">
                  {client.nome}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {client.empresa}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {filteredClients.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <p className="text-sm text-muted-foreground">
            Nenhum cliente encontrado
          </p>
        </motion.div>
      )}
    </motion.div>
  )
} 