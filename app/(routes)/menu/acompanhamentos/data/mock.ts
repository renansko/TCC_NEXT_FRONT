import type { Route, RouteStatus, Vehicle, Driver, Client } from '../types';

const routeStatuses: Record<RouteStatus['code'], RouteStatus> = {
  pending: {
    code: 'pending',
    label: 'Pendente',
    color: 'yellow',
  },
  in_progress: {
    code: 'in_progress',
    label: 'Em Andamento',
    color: 'green',
  },
  completed: {
    code: 'completed',
    label: 'Concluída',
    color: 'blue',
  },
  cancelled: {
    code: 'cancelled',
    label: 'Cancelada',
    color: 'red',
  },
};

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    plate: 'ABC-1234',
    model: 'Volvo FH 460',
    status: 'active',
    fuelLevel: 75,
    lastMaintenance: new Date('2024-01-01'),
  },
  {
    id: '2',
    plate: 'DEF-5678',
    model: 'Scania R450',
    status: 'active',
    fuelLevel: 60,
    lastMaintenance: new Date('2024-02-15'),
  },
  {
    id: '3',
    plate: 'GHI-9012',
    model: 'Mercedes Actros',
    status: 'active',
    fuelLevel: 85,
    lastMaintenance: new Date('2024-03-01'),
  },
  {
    id: '4',
    plate: 'JKL-3456',
    model: 'Volvo FH16',
    status: 'active',
    fuelLevel: 45,
    lastMaintenance: new Date('2024-02-28'),
  },
  {
    id: '5',
    plate: 'MNO-7890',
    model: 'Scania S730',
    status: 'active',
    fuelLevel: 90,
    lastMaintenance: new Date('2024-03-10'),
  },
];

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'João Silva',
    status: 'on_route',
    license: 'ABC123456',
  },
  {
    id: '2',
    name: 'Maria Santos',
    status: 'on_route',
    license: 'DEF789012',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    status: 'on_route',
    license: 'GHI345678',
  },
  {
    id: '4',
    name: 'Ana Costa',
    status: 'on_route',
    license: 'JKL901234',
  },
  {
    id: '5',
    name: 'Carlos Souza',
    status: 'on_route',
    license: 'MNO567890',
  },
];

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Tech Solutions',
    address: 'Av. Paulista, 1000',
    coordinates: { lat: -23.550520, lng: -46.633309 }, // São Paulo
  },
  {
    id: '2',
    name: 'Logistics Pro',
    address: 'Rua da Consolação, 2000',
    coordinates: { lat: -23.558, lng: -46.662 }, // São Paulo - Consolação
  },
  {
    id: '3',
    name: 'Fast Delivery',
    address: 'Av. Brigadeiro Faria Lima, 3000',
    coordinates: { lat: -23.567, lng: -46.693 }, // São Paulo - Faria Lima
  },
  {
    id: '4',
    name: 'Express Cargo',
    address: 'Av. Rebouças, 1500',
    coordinates: { lat: -23.573, lng: -46.672 }, // São Paulo - Pinheiros
  },
  {
    id: '5',
    name: 'Quick Transport',
    address: 'Av. Berrini, 500',
    coordinates: { lat: -23.594, lng: -46.687 }, // São Paulo - Berrini
  },
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Entrega Tech Solutions #1',
    status: routeStatuses.in_progress,
    vehicle: mockVehicles[0],
    driver: mockDrivers[0],
    client: mockClients[0],
    origin: {
      address: 'Centro de Distribuição SP',
      location: { lat: -23.540, lng: -46.630 },
    },
    destination: {
      address: 'Tech Solutions - Matriz',
      location: { lat: -23.550520, lng: -46.633309 },
    },
    currentLocation: { lat: -23.545, lng: -46.632 },
    distance: {
      total: 100,
      completed: 75,
      unit: 'km',
    },
    time: {
      departure: new Date('2024-03-20T08:00:00'),
      estimated_arrival: new Date('2024-03-20T10:00:00'),
      duration: 120,
    },
    path: {
      completed: [
        { lat: -23.540, lng: -46.630 },
        { lat: -23.545, lng: -46.632 },
      ],
      remaining: [
        { lat: -23.548, lng: -46.633 },
        { lat: -23.550520, lng: -46.633309 },
      ],
    },
  },
  {
    id: '2',
    name: 'Entrega Logistics Pro #1',
    status: routeStatuses.pending,
    vehicle: mockVehicles[1],
    driver: mockDrivers[1],
    client: mockClients[1],
    origin: {
      address: 'Centro de Distribuição SP',
      location: { lat: -23.540, lng: -46.630 },
    },
    destination: {
      address: 'Logistics Pro - Filial',
      location: { lat: -23.558, lng: -46.662 },
    },
    currentLocation: { lat: -23.540, lng: -46.630 },
    distance: {
      total: 80,
      completed: 0,
      unit: 'km',
    },
    time: {
      departure: new Date('2024-03-20T09:00:00'),
      estimated_arrival: new Date('2024-03-20T11:00:00'),
      duration: 120,
    },
    path: {
      completed: [],
      remaining: [
        { lat: -23.540, lng: -46.630 },
        { lat: -23.558, lng: -46.662 },
      ],
    },
  },
  {
    id: '3',
    name: 'Entrega Fast Delivery #1',
    status: routeStatuses.in_progress,
    vehicle: mockVehicles[2],
    driver: mockDrivers[2],
    client: mockClients[2],
    origin: {
      address: 'Centro de Distribuição SP',
      location: { lat: -23.540, lng: -46.630 },
    },
    destination: {
      address: 'Fast Delivery - HQ',
      location: { lat: -23.567, lng: -46.693 },
    },
    currentLocation: { lat: -23.555, lng: -46.660 },
    distance: {
      total: 120,
      completed: 60,
      unit: 'km',
    },
    time: {
      departure: new Date('2024-03-20T07:30:00'),
      estimated_arrival: new Date('2024-03-20T09:30:00'),
      duration: 120,
    },
    path: {
      completed: [
        { lat: -23.540, lng: -46.630 },
        { lat: -23.555, lng: -46.660 },
      ],
      remaining: [
        { lat: -23.560, lng: -46.675 },
        { lat: -23.567, lng: -46.693 },
      ],
    },
  },
  {
    id: '4',
    name: 'Entrega Express Cargo #1',
    status: routeStatuses.completed,
    vehicle: mockVehicles[3],
    driver: mockDrivers[3],
    client: mockClients[3],
    origin: {
      address: 'Centro de Distribuição SP',
      location: { lat: -23.540, lng: -46.630 },
    },
    destination: {
      address: 'Express Cargo - Unidade 1',
      location: { lat: -23.573, lng: -46.672 },
    },
    currentLocation: { lat: -23.573, lng: -46.672 },
    distance: {
      total: 90,
      completed: 90,
      unit: 'km',
    },
    time: {
      departure: new Date('2024-03-20T06:00:00'),
      estimated_arrival: new Date('2024-03-20T08:00:00'),
      duration: 120,
    },
    path: {
      completed: [
        { lat: -23.540, lng: -46.630 },
        { lat: -23.555, lng: -46.650 },
        { lat: -23.573, lng: -46.672 },
      ],
      remaining: [],
    },
  },
  {
    id: '5',
    name: 'Entrega Quick Transport #1',
    status: routeStatuses.cancelled,
    vehicle: mockVehicles[4],
    driver: mockDrivers[4],
    client: mockClients[4],
    origin: {
      address: 'Centro de Distribuição SP',
      location: { lat: -23.540, lng: -46.630 },
    },
    destination: {
      address: 'Quick Transport - Matriz',
      location: { lat: -23.594, lng: -46.687 },
    },
    currentLocation: { lat: -23.550, lng: -46.645 },
    distance: {
      total: 150,
      completed: 30,
      unit: 'km',
    },
    time: {
      departure: new Date('2024-03-20T08:30:00'),
      estimated_arrival: new Date('2024-03-20T10:30:00'),
      duration: 120,
    },
    path: {
      completed: [
        { lat: -23.540, lng: -46.630 },
        { lat: -23.550, lng: -46.645 },
      ],
      remaining: [
        { lat: -23.570, lng: -46.660 },
        { lat: -23.594, lng: -46.687 },
      ],
    },
  },
];

export function simulateRouteUpdate(route: Route): Route {
  // Simulate movement along the path
  const newCompletedPath = [...route.path.completed];
  const newRemainingPath = [...route.path.remaining];
  
  if (newRemainingPath.length > 0) {
    const nextPoint = newRemainingPath.shift()!;
    newCompletedPath.push(nextPoint);
    
    return {
      ...route,
      currentLocation: nextPoint,
      path: {
        completed: newCompletedPath,
        remaining: newRemainingPath,
      },
      distance: {
        ...route.distance,
        completed: route.distance.completed + 1,
      },
    };
  }
  
  return route;
} 