import { useState, useCallback } from "react"

interface AddressData {
  raw: string
  formatted: string | null
  isValid: boolean
  components?: {
    street?: string
    number?: string
    neighborhood?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
  }
}

interface UseAddressFieldProps {
  onChange: (value: string) => void
  initialValue?: string
}

export function useAddressField({ onChange, initialValue = "" }: UseAddressFieldProps) {
  const [addressData, setAddressData] = useState<AddressData>({
    raw: initialValue,
    formatted: initialValue,
    isValid: false,
  })

  // Format raw input before sending to Google API
  const formatInput = useCallback((input: string) => {
    // Remove extra spaces and special characters
    return input.trim().replace(/\s+/g, " ")
  }, [])

  // Parse Google Places result
  const parseGoogleAddress = useCallback((result: google.maps.places.PlaceResult): AddressData => {
    const components: AddressData['components'] = {}
    
    result.address_components?.forEach((component) => {
      const type = component.types[0]
      switch (type) {
        case "street_number":
          components.number = component.long_name
          break
        case "route":
          components.street = component.long_name
          break
        case "sublocality":
          components.neighborhood = component.long_name
          break
        case "locality":
          components.city = component.long_name
          break
        case "administrative_area_level_1":
          components.state = component.short_name
          break
        case "country":
          components.country = component.long_name
          break
        case "postal_code":
          components.postalCode = component.long_name
          break
      }
    })

    return {
      raw: result.formatted_address || "",
      formatted: result.formatted_address || null,
      isValid: true,
      components,
    }
  }, [])

  // Handle raw input changes (typing)
  const handleInputChange = useCallback((value: string) => {
    const formatted = formatInput(value)
    setAddressData(prev => ({
      ...prev,
      raw: formatted,
      isValid: false,
    }))
  }, [formatInput])

  // Handle selection from Google Places
  const handleAddressSelect = useCallback((result: google.maps.places.PlaceResult) => {
    const newAddressData = parseGoogleAddress(result)
    setAddressData(newAddressData)
    
    if (newAddressData.formatted) {
      onChange(newAddressData.formatted)
    }
  }, [parseGoogleAddress, onChange])

  // Handle manual input confirmation
  const handleManualInput = useCallback((value: string) => {
    const formatted = formatInput(value)
    setAddressData({
      raw: formatted,
      formatted: formatted,
      isValid: true, // Consider manual input as valid but flag it differently
    })
    onChange(formatted)
  }, [formatInput, onChange])

  return {
    addressData,
    handleInputChange,
    handleAddressSelect,
    handleManualInput,
  }
} 