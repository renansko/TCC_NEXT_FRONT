"use client"

import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/Icons"
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"

interface SearchBarProps {
  onSearch: (term: string) => void
  onFilterChange: (value: boolean | null) => void
}

export function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(() => {
    onSearch(debouncedSearch)
  }, [debouncedSearch, onSearch])

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
      <div className="relative flex-grow">
        <Icons.search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome ou placa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <select
        onChange={(e) => onFilterChange(e.target.value === "" ? null : e.target.value === "true")}
        className="border rounded p-2"
      >
        <option value="">Todos</option>
        <option value="true">Disponíveis</option>
        <option value="false">Indisponíveis</option>
      </select>
    </div>
  )
} 