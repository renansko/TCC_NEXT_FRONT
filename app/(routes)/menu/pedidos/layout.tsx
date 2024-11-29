import { getAllOrders } from "./services/order-service";

export default async function PedidosLayout({ children }: { children: React.ReactNode }) {
//   const orders = await getAllOrders()
  return <>{children}</>
}
