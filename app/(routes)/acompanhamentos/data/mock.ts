import { TruckData } from "../types"

interface Location {
  lat: number;
  lng: number;
}

const createMockRoute = (start: [number, number], end: [number, number], points: number): Location[] => {
  const route: Location[] = []
  for (let i = 0; i <= points; i++) {
    route.push({
      lat: start[0] + (end[0] - start[0]) * (i / points),
      lng: start[1] + (end[1] - start[1]) * (i / points)
    })
  }
  return route
}

export const mockTrucks: TruckData[] = [
  {
    id: "1",
    placa: "ABC-1234",
    motorista: "João Silva",
    modelo: "Volvo FH 460",
    status: "em_rota",
    combustivel: 75,
    velocidade: 80,
    pedido: {
      id: "PED001",
      numero: "PED-2024-001",
      cliente: "Tech Solutions",
      status: "em_andamento",
      tempoPercurso: 120,
      tempoEstimado: 45
    },
    rota: {
      origem: 'São paulo', // São Paulo
      destino: 'Rio de janeiro', // Rio de Janeiro
      pontoAtual: { lat: -23.223684, lng: -44.903103 }, // Ponto intermediário
      historicoPercurso: createMockRoute(
        [-23.550520, -46.633309],
        [-23.223684, -44.903103],
        20
      ).map(point => ({ ...point, timestamp: new Date() })),
      rotaPlanejada: createMockRoute(
        [-23.223684, -44.903103],
        [-22.906847, -43.172897],
        20
      ),
      distanciaPercorrida: 250,
      distanciaTotal: 400,
      horaSaida: new Date(Date.now() - 7200000), // 2 hours ago
      horaPrevisaoChegada: new Date(Date.now() + 3600000) // 1 hour from now
    }
  },
  {
    id: "2",
    placa: "DEF-5678",
    motorista: "Maria Santos",
    modelo: "Scania R450",
    status: "em_rota",
    combustivel: 60,
    velocidade: 75,
    pedido: {
      id: "PED002",
      numero: "PED-2024-002",
      cliente: "Logistics Pro",
      status: "em_andamento",
      tempoPercurso: 90,
      tempoEstimado: 60
    },
    rota: {
      origem: 'São paulo', // São Paulo
      destino: 'Rio de janeiro', // Curitiba
      pontoAtual: { lat: -24.489433, lng: -47.850223 }, // Ponto intermediário
      historicoPercurso: createMockRoute(
        [-23.550520, -46.633309],
        [-24.489433, -47.850223],
        20
      ).map(point => ({ ...point, timestamp: new Date() })),
      rotaPlanejada: createMockRoute(
        [-24.489433, -47.850223],
        [-25.428954, -49.267137],
        20
      ),
      distanciaPercorrida: 180,
      distanciaTotal: 350,
      horaSaida: new Date(Date.now() - 5400000),
      horaPrevisaoChegada: new Date(Date.now() + 5400000)
    }
  },
  {
    id: "3",
    placa: "GHI-9012",
    motorista: "Pedro Oliveira",
    modelo: "Mercedes-Benz Actros",
    status: "parado",
    combustivel: 45,
    velocidade: 0,
    pedido: {
      id: "PED003",
      numero: "PED-2024-003",
      cliente: "Fast Delivery",
      status: "atrasado",
      tempoPercurso: 150,
      tempoEstimado: 90
    },
    rota: {
      origem: 'São paulo', // São Paulo
      destino: 'Belo horizonte', // Belo Horizonte
      pontoAtual: { lat: -22.183333, lng: -45.883333 }, // Pouso Alegre
      historicoPercurso: createMockRoute(
        [-23.550520, -46.633309],
        [-22.183333, -45.883333],
        20
      ).map(point => ({ ...point, timestamp: new Date() })),
      rotaPlanejada: createMockRoute(
        [-22.183333, -45.883333],
        [-19.917299, -43.934559],
        20
      ),
      distanciaPercorrida: 200,
      distanciaTotal: 500,
      horaSaida: new Date(Date.now() - 10800000),
      horaPrevisaoChegada: new Date(Date.now() + 7200000)
    }
  },
  {
    id: "4",
    placa: "JKL-3456",
    motorista: "Ana Costa",
    modelo: "Iveco S-Way",
    status: "em_rota",
    combustivel: 85,
    velocidade: 90,
    pedido: {
      id: "PED004",
      numero: "PED-2024-004",
      cliente: "Express Cargo",
      status: "em_andamento",
      tempoPercurso: 60,
      tempoEstimado: 30
    },
    rota: {
      origem: 'São paulo', // São Paulo
      destino: 'São jose dos campos', // São José dos Campos
      pontoAtual: { lat: -23.375694, lng: -46.260137 }, // Ponto intermediário
      historicoPercurso: createMockRoute(
        [-23.550520, -46.633309],
        [-23.375694, -46.260137],
        20
      ).map(point => ({ ...point, timestamp: new Date() })),
      rotaPlanejada: createMockRoute(
        [-23.375694, -46.260137],
        [-23.200770, -45.887279],
        20
      ),
      distanciaPercorrida: 50,
      distanciaTotal: 100,
      horaSaida: new Date(Date.now() - 3600000),
      horaPrevisaoChegada: new Date(Date.now() + 1800000)
    }
  },
  {
    id: "5",
    placa: "MNO-7890",
    motorista: "Carlos Souza",
    modelo: "DAF XF",
    status: "manutencao",
    combustivel: 30,
    velocidade: 0,
    pedido: {
      id: "PED005",
      numero: "PED-2024-005",
      cliente: "Quick Transport",
      status: "atrasado",
      tempoPercurso: 180,
      tempoEstimado: 120
    },
    rota: {
      origem: 'São paulo', // São Paulo
      destino: 'Araraquara', // Araraquara
      pontoAtual: { lat: -22.668333, lng: -47.333333 }, // Campinas
      historicoPercurso: createMockRoute(
        [-23.550520, -46.633309],
        [-22.668333, -47.333333],
        20
      ).map(point => ({ ...point, timestamp: new Date() })),
      rotaPlanejada: createMockRoute(
        [-22.668333, -47.333333],
        [-21.785741, -48.175332],
        20
      ),
      distanciaPercorrida: 100,
      distanciaTotal: 300,
      horaSaida: new Date(Date.now() - 14400000),
      horaPrevisaoChegada: new Date(Date.now() + 10800000)
    }
  }
]

export const simulateRealTimeUpdate = (truck: TruckData): TruckData => {
  const now = new Date()
  const progress = (now.getTime() - truck.rota.horaSaida.getTime()) / 
    (truck.rota.horaPrevisaoChegada.getTime() - truck.rota.horaSaida.getTime())

  // Update current position based on time progress
  // const newPoint = {
  //   lat: truck.rota.origem.lat + (truck.rota.destino.lat - truck.rota.origem.lat) * progress,
  //   lng: truck.rota.origem.lng + (truck.rota.destino.lng - truck.rota.origem.lng) * progress
  // }

  return {
    ...truck,
    combustivel: Math.max(0, truck.combustivel - Math.random() * 0.5),
    velocidade: 60 + Math.random() * 40,
    rota: {
      ...truck.rota,
      //pontoAtual: newPoint,
      historicoPercurso: [
        ...truck.rota.historicoPercurso,
        //{ ...newPoint, timestamp: now }
      ],
      distanciaPercorrida: truck.rota.distanciaTotal * progress
    }
  }
} 