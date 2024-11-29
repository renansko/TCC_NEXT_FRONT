export const mockTransfers = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Caminhão A",
    model: "Mercedes-Benz Actros",
    plate: "ABC-1234",
    status: "Disponível",
    companyId: "123e4567-e89b-12d3-a456-426614174001",
    driverId: "123e4567-e89b-12d3-a456-426614174002"
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    name: "Van B",
    model: "Fiat Ducato",
    plate: "DEF-5678",
    status: "Disponível",
    companyId: "123e4567-e89b-12d3-a456-426614174001",
    driverId: "123e4567-e89b-12d3-a456-426614174004"
  }
]

export const mockItems = [
  {
    id: "123e4567-e89b-12d3-a456-426614174005",
    name: "Caixa Grande",
    description: "Caixa de papelão reforçado para itens pesados",
    quantity: 50,
    amount: 25.99,
    weight: 2.5,
    createdAt: new Date()
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174006",
    name: "Envelope Seguro",
    description: "Envelope com proteção extra para documentos",
    quantity: 100,
    amount: 15.50,
    weight: 0.5,
    createdAt: new Date()
  }
]

export const mockUsers = [
  {
    id: "123e4567-e89b-12d3-a456-426614174007",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 99999-9999",
    birth: new Date("1990-01-01"),
    role: "cliente"
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174008",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "(11) 88888-8888",
    birth: new Date("1985-05-15"),
    role: "cliente"
  }
] 