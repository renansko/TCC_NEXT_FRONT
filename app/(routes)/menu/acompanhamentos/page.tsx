'use client';

import { useState, useCallback, useEffect } from 'react';
import { ErrorAlert } from '@/components/ui/errors/ErrorAlert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useMap } from './contexts/map-context';
import type { Route } from './types';
import { Card,CardHeader } from '@/components/ui/card';
import { NewRouteModal } from './components/new-route-modal';
import { RouteMapContainer } from './components/route-container';

export default function AcompanhamentoPage() {
  const { state: { routes, isLoading, error, selectedRouteInfo }, mapActions: { refresh } } = useMap();
  const [showNewRouteModal, setShowNewRouteModal] = useState(false);

  const handleNewRouteClick = useCallback(() => {
    setShowNewRouteModal(true);
  }, []);

  const handleRouteCreated = useCallback(() => {
    setShowNewRouteModal(false);
    refresh();
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!routes.length) return null;

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <ErrorAlert
          title="Erro ao carregar rotas"
          description={error.message}
          onRetry={refresh}
        />
      </div>
    );
  }

  if (!routes.length) return null;

  return (
    <div key="acompanhamento-page" className="relative w-full h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full gap-4">
        <RouteList routes={routes} />
        <div className="relative flex-1">
          <RouteMapContainer 
            selectedRoute={selectedRouteInfo}
            routes={routes}
            onNewRoute={handleNewRouteClick}
          />
        </div>
      </div>
      <NewRouteModal 
        open={showNewRouteModal}
        onOpenChange={setShowNewRouteModal}
        onRouteCreated={handleRouteCreated}
      />
    </div>
  );
}
const RouteList = ({ routes }: { routes: Route[] }) => {
  const { mapActions: { selectRouteInfo } } = useMap();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleSelectRouteInfo = useCallback((route: Route) => {
    setSelectedRoute(route);
  }, []);
  useEffect(() => {
    if (selectedRoute) {
      selectRouteInfo(selectedRoute);
    }
  }, [selectedRoute, selectRouteInfo]);
  if (!routes.length) return null;
  const destination = routes[0].destination.name.split(',')[0];
  const source = routes[0].source.name.split(',')[0];

  return (
    <div className="flex gap-2 w-full w-max-[calc(100vw-2rem)] overflow-x-auto">
      {routes.map((route) => (
        <Card key={route.id} className="w-full" onClick={() => handleSelectRouteInfo(route)}>
          <CardHeader>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">{source}</div>
                  <div className="text-sm font-semibold">{destination}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">
                    {Math.round(route.distance / 1000)} km
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.floor(route.duration / 60 / 60)}h {Math.floor((route.duration / 60) % 60)}min
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
              {route.directions?.routes && route.directions.routes.length > 0
                    ? route.directions.routes[0].summary
                    : "Resumo da rota não disponível"}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
