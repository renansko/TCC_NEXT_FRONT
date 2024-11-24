export const mockClients = [
  {
    id: "1",
    nome: "João Silva",
    empresa: "Tech Solutions",
    email: "joao@tech.com",
    isAdmin: true,
    dataNascimento: new Date(1985, 5, 15),
    avatar: "/avatars/joao.jpg"
  },
  {
    id: "2",
    nome: "Maria Santos",
    empresa: "Design Co",
    email: "maria@design.com",
    isAdmin: false,
    dataNascimento: new Date(1990, 8, 22),
    avatar: "/avatars/maria.jpg"
  }
]

export const mockOrders = [
  { 
    id: "1", 
    numeroPedido: "PED001", 
    dataPedido: new Date(2024, 2, 1), 
    status: "concluido",
    clientId: "1"
  },
  { 
    id: "2", 
    numeroPedido: "PED002", 
    dataPedido: new Date(2024, 2, 5), 
    status: "cancelado",
    clientId: "1"
  },
  { 
    id: "3", 
    numeroPedido: "PED003", 
    dataPedido: new Date(2024, 2, 10), 
    status: "Em rota de entrega",
    clientId: "2"
  },
  { 
    id: "4", 
    numeroPedido: "PED004", 
    dataPedido: new Date(2024, 2, 15), 
    status: "concluido",
    clientId: "2"
  }
] as const 