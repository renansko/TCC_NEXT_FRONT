import ProtectedRoute from "@/app/auth/protected-route"

export default function AcompanhamentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
} 