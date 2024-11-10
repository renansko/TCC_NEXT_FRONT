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

export const MAP_STYLES = {
  DEFAULT: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ weight: "2.00" }],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [{ color: "#9c9c9c" }],
    },
    // Add more styles as needed
  ],
}; 