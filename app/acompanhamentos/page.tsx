"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

// Simulação de dados em tempo real
const simulateRealTimeData = () => ({
  veiculo: {
    motorista: "João Silva",
    carro: "Fiat Uno",
    combustivel: Math.floor(Math.random() * 100),
    velocidade: Math.floor(Math.random() * 120)
  },
  status: {
    statusPedido: ["Em andamento", "Entregue", "Atrasado"][Math.floor(Math.random() * 3)],
    numeroPedido: "PED-" + Math.floor(Math.random() * 10000),
    tempoPercurso: Math.floor(Math.random() * 120) + " min",
    tempoEstimado: Math.floor(Math.random() * 60) + " min"
  },
  coordenadas: {
    lat: -23.550520 + (Math.random() - 0.5) * 0.1,
    lng: -46.633309 + (Math.random() - 0.5) * 0.1
  }
})

export default function Acompanhamento() {
  const [dados, setDados] = useState(simulateRealTimeData())

  useEffect(() => {
    const interval = setInterval(() => {
      setDados(simulateRealTimeData())
    }, 5000) // Atualiza a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Acompanhamento</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Veículo</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Motorista:</strong> {dados.veiculo.motorista}</p>
                <p><strong>Carro:</strong> {dados.veiculo.carro}</p>
                <p><strong>Combustível:</strong> {dados.veiculo.combustivel}%</p>
                <p><strong>Velocidade:</strong> {dados.veiculo.velocidade} km/h</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Status:</strong> {dados.status.statusPedido}</p>
                <p><strong>Nº do Pedido:</strong> {dados.status.numeroPedido}</p>
                <p><strong>Tempo de Percurso:</strong> {dados.status.tempoPercurso}</p>
                <p><strong>Tempo Estimado até o Destino:</strong> {dados.status.tempoEstimado}</p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader>
                <CardTitle>Mapa em Tempo Real</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
                  {/* Aqui você integraria um mapa real, como Google Maps ou Mapbox */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin size={48} className="text-primary" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
                    Lat: {dados.coordenadas.lat.toFixed(6)}, Lng: {dados.coordenadas.lng.toFixed(6)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}