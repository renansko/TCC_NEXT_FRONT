"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TruckData } from '../types'

interface TrackingMapProps {
  truck: TruckData
}

export function TrackingMap({ truck }: TrackingMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const routeLayerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(
        [truck.rota.pontoAtual.lat, truck.rota.pontoAtual.lng],
        13
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current)

      routeLayerRef.current = L.layerGroup().addTo(mapRef.current)
    }

    // Clear previous layers
    if (routeLayerRef.current) {
      routeLayerRef.current.clearLayers()
    }

    // Draw completed route
    const completedRoute = L.polyline(
      truck.rota.historicoPercurso.map(p => [p.lat, p.lng]),
      { color: '#22c55e', weight: 4 }
    ).addTo(routeLayerRef.current!)

    // Draw remaining route
    const remainingRoute = L.polyline(
      truck.rota.rotaPlanejada.map(p => [p.lat, p.lng]),
      { color: '#94a3b8', weight: 4, dashArray: '10, 10' }
    ).addTo(routeLayerRef.current!)

    // Add markers
    const originMarker = L.marker([truck.rota.origem.lat, truck.rota.origem.lng], {
      icon: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-green-500 rounded-full p-2">
                <div class="h-3 w-3"></div>
               </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    }).addTo(routeLayerRef.current!)

    const destinationMarker = L.marker([truck.rota.destino.lat, truck.rota.destino.lng], {
      icon: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-red-500 rounded-full p-2">
                <div class="h-3 w-3"></div>
               </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    }).addTo(routeLayerRef.current!)

    // Add truck marker
    const truckMarker = L.marker([truck.rota.pontoAtual.lat, truck.rota.pontoAtual.lng], {
      icon: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-blue-500 rounded-full p-2 animate-pulse">
                <div class="h-3 w-3"></div>
               </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    }).addTo(routeLayerRef.current!)

    // Fit bounds to show entire route
    const bounds = L.latLngBounds([
      [truck.rota.origem.lat, truck.rota.origem.lng],
      [truck.rota.destino.lat, truck.rota.destino.lng],
      [truck.rota.pontoAtual.lat, truck.rota.pontoAtual.lng]
    ])
    mapRef.current.fitBounds(bounds, { padding: [50, 50] })

    return () => {
      if (mapRef.current && !mapRef.current.remove) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [truck])

  return <div id="map" className="w-full max-w-full h-full rounded-lg" />
} 