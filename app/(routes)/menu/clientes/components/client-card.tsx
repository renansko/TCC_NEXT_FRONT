"use client"

import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/Icons"
import type { Client } from "../types"
import { Button } from "@/components/ui/button"

interface ClientCardProps {
  client: Client
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Cliente</CardTitle>
      </CardHeader>
      <CardContent className="flex items-start space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={client.avatar} alt={client.nome} />
          <AvatarFallback>{client.nome.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icons.user className="h-4 w-4" />
            <span className="font-semibold">{client.nome}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.building2 className="h-4 w-4" />
            <span>{client.empresa}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.mail className="h-4 w-4" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.calendar className="h-4 w-4" />
            <span>{format(client.dataNascimento, "dd/MM/yyyy")}</span>
          </div>
          <Badge variant={client.isAdmin ? "success" : "default"}>
            {client.isAdmin ? "Administrador" : "Usuário"}
          </Badge>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(client)}
            >
              <Icons.edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(client.id)}
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 