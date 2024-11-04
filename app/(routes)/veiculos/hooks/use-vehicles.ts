import { useState, useCallback, useMemo } from "react"
import type { Vehicle, VehicleFormData } from "../types"

export function useVehicles(initialVehicles: Vehicle[]) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDisponivel, setFilterDisponivel] = useState<boolean | null>(null)

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term.toLowerCase())
  }, [])

  const handleFilterChange = useCallback((value: boolean | null) => {
    setFilterDisponivel(value)
  }, [])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = searchTerm === "" || 
        vehicle.nome.toLowerCase().includes(searchTerm) ||
        vehicle.placa.toLowerCase().includes(searchTerm)
      
      const matchesFilter = filterDisponivel === null || 
        vehicle.disponivel === filterDisponivel

      return matchesSearch && matchesFilter
    })
  }, [vehicles, searchTerm, filterDisponivel])

  const createVehicle = useCallback((data: VehicleFormData) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newVehicle = { 
      ...data, 
      id,
      imagem: data.imagem instanceof File 
        ? URL.createObjectURL(data.imagem) 
        : data.imagem
    }
    setVehicles(prev => [...prev, newVehicle as Vehicle])
  }, [])

  const updateVehicle = useCallback((id: string, data: VehicleFormData) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === id 
        ? {
            ...vehicle,
            ...data,
            imagem: data.imagem instanceof File 
              ? URL.createObjectURL(data.imagem) 
              : data.imagem
          }
        : vehicle
    ))
  }, [])

  const deleteVehicle = useCallback((id: string) => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== id))
  }, [])

  return {
    vehicles: filteredVehicles,
    handleSearch,
    handleFilterChange,
    createVehicle,
    updateVehicle,
    deleteVehicle
  }
} 