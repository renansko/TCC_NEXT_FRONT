"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusIcon, SearchIcon, EditIcon, TrashIcon, Paperclip } from "lucide-react"
import Image from "next/image"
import fordK from '../../public/FordK.jpeg'
import gol from '../../public/Gol.jpeg'
import uno from '../../public/Uno.jpg'
import { StaticImageData } from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
type Veiculo = {
  id: string
  nome: string
  placa: string
  disponivel: boolean
  imagem: string | StaticImageData // Alterado para aceitar StaticImageData
}

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDisponivel, setFilterDisponivel] = useState<boolean | null>(null)
  const [novoVeiculo, setNovoVeiculo] = useState<Omit<Veiculo, "id">>({
    nome: "",
    placa: "",
    disponivel: true,
    imagem: ""
  })
  const [editandoVeiculo, setEditandoVeiculo] = useState<Veiculo | null>(null)

  useEffect(() => {
    // Simula o carregamento de dados
    const veiculosMock: Veiculo[] = [
      { id: "1", nome: "Fiat Uno", placa: "ABC-1234", disponivel: true, imagem: uno},
      { id: "2", nome: "Ford Ka", placa: "DEF-5678", disponivel: false, imagem: fordK },
      { id: "3", nome: "Volkswagen Gol", placa: "GHI-9012", disponivel: true, imagem: gol },
    ]
    setVeiculos(veiculosMock)
  }, [])

  const handleCreateVeiculo = () => {
    const id = Math.random().toString(36).substr(2, 9)
    setVeiculos([...veiculos, { ...novoVeiculo, id }])
    setNovoVeiculo({ nome: "", placa: "", disponivel: true, imagem: "" })
  }

  const handleUpdateVeiculo = () => {
    if (editandoVeiculo) {
      setVeiculos(veiculos.map(v => v.id === editandoVeiculo.id ? editandoVeiculo : v))
      setEditandoVeiculo(null)
    }
  }

  const handleDeleteVeiculo = (id: string) => {
    setVeiculos(veiculos.filter(v => v.id !== id))
  }

  const filteredVeiculos = veiculos.filter(veiculo => 
    veiculo.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterDisponivel === null || veiculo.disponivel === filterDisponivel)
  )

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Veículos</h1>
        
        <div className="flex justify-between items-center mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button><PlusIcon className="mr-2 h-4 w-4" /> Novo Veículo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                <DialogDescription>Preencha os detalhes do novo veículo aqui.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">Nome</Label>
                  <Input
                    id="nome"
                    value={novoVeiculo.nome}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, nome: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="placa" className="text-right">Placa</Label>
                  <Input
                    id="placa"
                    value={novoVeiculo.placa}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, placa: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="disponivel" className="text-right">Disponível</Label>
                  <Input
                    id="disponivel"
                    type="checkbox"
                    checked={novoVeiculo.disponivel}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, disponivel: e.target.checked})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-8" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  
                </TooltipProvider>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateVeiculo}>Adicionar Veículo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Procurar veículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              value={filterDisponivel === null ? "" : filterDisponivel.toString()}
              onChange={(e) => setFilterDisponivel(e.target.value === "" ? null : e.target.value === "true")}
              className="border rounded p-2"
            >
              <option value="">Todos</option>
              <option value="true">Disponíveis</option>
              <option value="false">Indisponíveis</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVeiculos.map((veiculo) => (
            <Card key={veiculo.id}>
              <CardContent className="p-4">
                <Image 
                  src={veiculo.imagem}
                  alt={veiculo.nome} 
                  width={500} // Defina a largura desejada
                  height={200} // Defina a altura desejada
                  className="w-full h-48 object-cover mb-4 rounded" 
                />
                <h2 className="text-xl font-semibold">{veiculo.nome}</h2>
                <p>Placa: {veiculo.placa}</p>
                <p className={veiculo.disponivel ? "text-green-600" : "text-red-600"}>
                  {veiculo.disponivel ? "Disponível" : "Indisponível"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setEditandoVeiculo(veiculo)}>
                      <EditIcon className="mr-2 h-4 w-4" /> Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Veículo</DialogTitle>
                      <DialogDescription>Faça as alterações necessárias nos detalhes do veículo.</DialogDescription>
                    </DialogHeader>
                    {editandoVeiculo && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-nome" className="text-right">Nome</Label>
                          <Input
                            id="edit-nome"
                            value={editandoVeiculo.nome}
                            onChange={(e) => setEditandoVeiculo({...editandoVeiculo, nome: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-placa" className="text-right">Placa</Label>
                          <Input
                            id="edit-placa"
                            value={editandoVeiculo.placa}
                            onChange={(e) => setEditandoVeiculo({...editandoVeiculo, placa: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-disponivel" className="text-right">Disponível</Label>
                          <Input
                            id="edit-disponivel"
                            type="checkbox"
                            checked={editandoVeiculo.disponivel}    
                            onChange={(e) => setEditandoVeiculo({...editandoVeiculo, disponivel: e.target.checked})}
                            className="col-span-3"
                          />
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Paperclip className="size-8" />
                                <span className="sr-only">Attach file</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Attach File</TooltipContent>
                          </Tooltip>
                          </TooltipProvider>
                      </div>
                    )}
                    <DialogFooter>
                      <Button onClick={handleUpdateVeiculo}>Salvar Alterações</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDeleteVeiculo(veiculo.id)}>
                  <TrashIcon className="mr-2 h-4 w-4" /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
