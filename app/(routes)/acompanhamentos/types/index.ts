export interface Location {
  lat: number
  lng: number
}

export interface RoutePoint extends Location {
  timestamp: Date
}

export interface TruckData {
  id: string
  placa: string
  motorista: string
  modelo: string
  status: 'em_rota' | 'parado' | 'manutencao' | 'finalizado'
  combustivel: number
  velocidade: number
  pedido: {
    id: string
    numero: string
    cliente: string
    status: 'em_andamento' | 'entregue' | 'atrasado'
    tempoPercurso: number // em minutos
    tempoEstimado: number // em minutos
  }
  rota: {
    origem: string
    destino: string
    pontoAtual: Location
    historicoPercurso: RoutePoint[]
    rotaPlanejada: Location[]
    distanciaPercorrida: number // em km
    distanciaTotal: number // em km
    horaSaida: Date
    horaPrevisaoChegada: Date
  }
} 