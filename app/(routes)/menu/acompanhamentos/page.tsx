'use client';

import { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import { RouteDetails } from './components/route-details';
import { RouteMap } from './components/route-map';
import { NewRouteModal } from './components/new-route-modal';
import { Button } from '@/components/ui/button';
import { Plus, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ErrorAlert } from '@/components/ui/errors/ErrorAlert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useMap } from './contexts/map-context';
import type { Route } from './types';
import { Card, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';

interface RouteMapContainerProps {
  selectedRoute: Route | null;
  routes: Route[];
  onNewRoute: () => void;
}

const RouteMapContainer = ({ selectedRoute, routes, onNewRoute }: RouteMapContainerProps) => {
  const { mapActions: { initializeMap } } = useMap();
  const mapDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDivRef.current) {
      initializeMap(mapDivRef.current);
    }
  }, [initializeMap]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <>
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <div ref={mapDivRef} className="absolute inset-0 bottom-0 pointer-events-auto" />
        <RouteMap selectedRoute={selectedRoute} routes={routes} />
        {/* Map Controls */}
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-auto z-10">
          <div className="absolute left-4 top-4 flex gap-2">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="default" 
                  size="icon" 
                  className="lg:hidden bg-background/95 backdrop-blur-sm hover:bg-background/80"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">

              </SheetContent>
            </Sheet>

            {/* New Route Button */}
            <Button
              className="shadow-lg"
              variant="default"
              onClick={onNewRoute}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Nova Rota</span>
            </Button>
          </div>
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        {selectedRoute && (
          <div className="absolute right-4 h-fit top-4 w-full max-w-[400px] transition-all hidden lg:block pointer-events-auto z-10">
            <RouteDetails />
          </div>
        )}
      </Suspense>
      </>
    </div>
  );
};

export default function AcompanhamentoPage() {
  const { state: { routes, isLoading, refresh, error, selectedRouteInfo } } = useMap();
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
    <div className="relative w-full h-[calc(100vh-8rem)] ">
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
    </div>
  );
}
const RouteList = ({ routes }: { routes: Route[] }) => {
  if (!routes.length) return null;
  const { mapActions: { selectRouteInfo }} = useMap();
  const destination = routes[0].destination.name.split(',')[0];
  const source = routes[0].source.name.split(',')[0];
  
  const handleSelectRouteInfo = (route: Route) => {
    selectRouteInfo(route);
  }
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
                {route.directions?.routes[0].summary}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
