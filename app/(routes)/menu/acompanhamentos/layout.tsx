import Script from "next/dist/client/script";
import { MapProvider } from "./contexts/map-context";

export default function AcompanhamentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ensure the API key exists
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY) {
    console.error('Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your .env file');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-500">Erro de Configuração</h1>
          <p className="text-gray-600">A chave da API do Google Maps não está configurada.</p>
        </div>
      </div>
    );
  }

  return (
    <MapProvider>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places,geometry`}
        strategy="beforeInteractive"
/>
      {children}
    </MapProvider>
  );
} 