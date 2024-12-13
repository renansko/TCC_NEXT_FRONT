"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useMapsLibrary } from "@/hooks/use-maps-library"
import { cn } from "@/lib/utils"
import { ControllerRenderProps, FieldError } from "react-hook-form"

interface ParsedPrediction {
  id: string
  description: string
}

interface AddressSearchProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'onChange'> {
  field: ControllerRenderProps<any, any>
  error?: FieldError
  label?: string
  onAddressSelect: (address: string) => void
}

export function AddressSearch({ 
  field,
  error,
  label,
  className,
  onAddressSelect,
  ...props 
}: AddressSearchProps) {
  const [searchValue, setSearchValue] = React.useState(field.value || "")
  const [predictions, setPredictions] = React.useState<ParsedPrediction[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [showDropdown, setShowDropdown] = React.useState(false)
  const searchTimeout = React.useRef<NodeJS.Timeout>()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const maps = useMapsLibrary('places')
  const autocompleteService = React.useRef<google.maps.places.AutocompleteService | null>(null)
  const placesService = React.useRef<google.maps.places.PlacesService | null>(null)

  // Initialize services
  React.useEffect(() => {
    if (!maps) return

    try {
      autocompleteService.current = new maps.places.AutocompleteService()
      const mapDiv = document.createElement('div')
      placesService.current = new maps.places.PlacesService(mapDiv)
    } catch (error) {
      console.error("Error initializing Places services:", error)
    }
  }, [maps])

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const parsePredictions = React.useCallback((results: google.maps.places.AutocompletePrediction[]): ParsedPrediction[] => {
    return results.map(prediction => ({
      id: prediction.place_id,
      description: prediction.description
    }))
  }, [])

  const handleSearch = React.useCallback((value: string) => {
    setSearchValue(value)
    setShowDropdown(true)

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    if (!value?.trim() || !autocompleteService.current) {
      setPredictions([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    searchTimeout.current = setTimeout(() => {
      try {
        autocompleteService.current?.getPlacePredictions(
          {
            input: value,
            componentRestrictions: { country: "br" },
            types: ["geocode"]
          },
          (results, status) => {
            setIsLoading(false)
            if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
              setPredictions([])
              return
            }
            setPredictions(parsePredictions(results))
          }
        )
      } catch (error) {
        console.error("Error fetching predictions:", error)
        setIsLoading(false)
        setPredictions([])
      }
    }, 300)
  }, [parsePredictions])

  const handleSelect = React.useCallback((prediction: ParsedPrediction) => {
    if (!placesService.current) return

    try {
      placesService.current.getDetails(
        {
          placeId: prediction.id,
          fields: ["formatted_address"]
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place?.formatted_address) {
            field.onChange(place.formatted_address)
            onAddressSelect(place.formatted_address)
            setSearchValue(place.formatted_address)
          } else {
            field.onChange(prediction.description)
            onAddressSelect(prediction.description)
            setSearchValue(prediction.description)
          }
          setShowDropdown(false)
          setPredictions([])
        }
      )
    } catch (error) {
      console.error("Error fetching place details:", error)
      field.onChange(prediction.description)
      onAddressSelect(prediction.description)
      setSearchValue(prediction.description)
      setShowDropdown(false)
      setPredictions([])
    }
  }, [field, onAddressSelect])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Input
          {...props}
          type="search"
          value={searchValue}
          className={cn(
            "pr-10 pl-8",
            className,
            error && "border-destructive"
          )}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {showDropdown && (predictions.length > 0 || isLoading) && (
        <div className="absolute w-full z-50 mt-2 max-h-[300px] overflow-y-auto rounded-md border bg-popover shadow-md">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              Buscando endereços...
            </div>
          ) : (
            <div className="py-2">
              {predictions.map((prediction) => (
                <div
                  key={prediction.id}
                  onClick={() => handleSelect(prediction)}
                  className="px-4 py-2 cursor-pointer hover:bg-muted"
                >
                  <div className="text-sm">{prediction.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {error && (
        <span className="text-sm text-destructive mt-1">
          {error.message}
        </span>
      )}
    </div>
  )
} 