import { useRef, useEffect, Suspense } from 'react';
import { RouteMap } from './route-map';
import { RouteDetails } from './route-details';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Route } from '../types';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMap } from '../contexts/map-context';
import { Button } from '@/components/ui/button';
import { Menu, Plus } from 'lucide-react';


interface RouteMapContainerProps {
    selectedRoute: Route | null;
    routes: Route[];
    onNewRoute: () => void;
  }
  
export function RouteMapContainer({ selectedRoute, routes, onNewRoute }: RouteMapContainerProps) {
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
              {/* Mo    bile Menu */}
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