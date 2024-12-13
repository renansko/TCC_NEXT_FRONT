import { useRef, useEffect, Suspense, useState } from 'react';
import { RouteMap } from './route-map';
import { RouteDetails } from './route-details';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Route } from '../types';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMap } from '../contexts/map-context';
import { Button } from '@/components/ui/button';
import { Menu, Plus, Truck } from 'lucide-react';
import { socket } from "@/app/utils/socket-io";

const SIMULATION_INTERVAL = 1000; // 1 second update interval

const RouteSimulator = ({ route, map }: { route: Route; map: google.maps.Map | null }) => {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLng | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const pathRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !route.directions) return;

    // Decode the polyline to get path points
    const path = google.maps.geometry.encoding.decodePath(
      route.directions.routes[0].overview_polyline.points
    );

    // Create the path polyline
    pathRef.current = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#2196F3',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map
    });

    // Create the truck marker
    markerRef.current = new google.maps.Marker({
      position: path[0],
      map,
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 6,
        fillColor: '#2196F3',
        fillOpacity: 1,
        strokeWeight: 2,
        rotation: 0 // automatically updated based on path
      }
    });

    let currentIndex = 0;
    const totalPoints = path.length;

    // Simulation interval
    const interval = setInterval(() => {
      if (currentIndex >= totalPoints - 1) {
        clearInterval(interval);
        return;
      }

      // Calculate next position
      currentIndex++;
      const position = path[currentIndex];
      
      // Calculate heading for marker rotation
      const heading = google.maps.geometry.spherical.computeHeading(
        path[currentIndex - 1],
        position
      );

      // Update marker
      if (markerRef.current) {
        markerRef.current.setPosition(position);
        markerRef.current.setIcon({
          ...markerRef.current.getIcon() as google.maps.Icon, 
          rotation: heading
        });
      }

      setCurrentPosition(position);

      // Emit socket event with new position
      socket.emit('position-update', {
        routeId: route.id,
        position: { lat: position.lat(), lng: position.lng() }
      });

    }, SIMULATION_INTERVAL);

    return () => {
      clearInterval(interval);
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (pathRef.current) {
        pathRef.current.setMap(null);
      }
    };
  }, [map, route]);

  return null; // This is a functional component that manages map overlays
};

export function RouteMapContainer({ 
  selectedRoute, 
  routes, 
  onNewRoute 
}: {
  selectedRoute: Route | null;
  routes: Route[];
  onNewRoute: () => void;
}) {
  const { mapActions: { initializeMap }, state: { map } } = useMap();
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

          {/* Simulate routes */}
          {map && routes.map(route => (
            <RouteSimulator 
              key={route.id} 
              route={route} 
              map={map}
            />
          ))}

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
}