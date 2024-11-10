"use client"

import { MapWrapper } from './map-wrapper'
import type { TruckData } from '../types'

interface TrackingMapProps {
  truck: TruckData
}

export function TrackingMap({ truck }: TrackingMapProps) {
  return <MapWrapper truck={truck} />
} 