import ProtectedRoute from "@/app/auth/protected-route"
import 'leaflet/dist/leaflet.css'

export default function AcompanhamentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
} 