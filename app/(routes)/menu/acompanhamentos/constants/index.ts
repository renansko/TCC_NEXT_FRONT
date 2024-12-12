export const ROUTE_STATUS = {
  PENDING: {
    code: "pending" as const,
    label: "Pendente",
    color: "yellow",
  },
  IN_PROGRESS: {
    code: "in_progress" as const,
    label: "Em Andamento",
    color: "green",
  },
  COMPLETED: {
    code: "completed" as const,
    label: "Concluída",
    color: "blue",
  },
  CANCELLED: {
    code: "cancelled" as const,
    label: "Cancelada",
    color: "red",
  },
} as const;
export const MAP_STYLES = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#b3d1ff' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }]
  }
];

export const DEFAULT_MAP_CONFIG = {
  zoom: 12,
  center: { lat: -23.550520, lng: -46.633309 }, // São Paulo
  styles: MAP_STYLES,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};
