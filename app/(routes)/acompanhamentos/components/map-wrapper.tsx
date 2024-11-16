"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { TruckData } from '../types'

const DynamicMap = dynamic(() => import('./google-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground">Carregando mapa...</span>
    </div>
  )
})

interface MapWrapperProps {
  truck: TruckData
}

export function MapWrapper({ truck }: MapWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-full rounded-lg bg-muted animate-pulse flex items-center justify-center">
        <span className="text-muted-foreground">Carregando mapa...</span>
      </div>
    )
  }

  return <DynamicMap truck={truck} />
} 