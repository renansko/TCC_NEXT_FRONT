import { useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  version: "weekly",
  libraries: ["places"]
})

export function useMapsLibrary(library: "places") {
  const [maps, setMaps] = useState<typeof google.maps | null>(null)

  useEffect(() => {
    loader.load().then((google) => {
      setMaps(google.maps)
    })
  }, [])

  return maps
} 