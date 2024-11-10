"use client";

import { useState } from "react";
import type { Route } from "./types";
import { MapProvider } from "./contexts/map-context";
import { RouteList } from "./components/route-list";
import { RouteDetails } from "./components/route-details";
import { RouteMap } from "./components/route-map";
import { NewRouteModal } from "./components/new-route-modal";
import { useRoutes } from "./hooks/use-routes";
import { Button } from "@/components/ui/button";
import { Plus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AcompanhamentoPage() {
  const { routes, loading, error, refresh } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showNewRouteModal, setShowNewRouteModal] = useState(false);
  const [isRouteListExpanded, setIsRouteListExpanded] = useState(true);

  // Handler for route selection/deselection
  const handleRouteSelect = (route: Route | null) => {
    if (route?.id === selectedRoute?.id) {
      setSelectedRoute(null);
    } else {
      setSelectedRoute(route);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MapProvider>
      <div className="grid h-[calc(100vh-6rem)] grid-rows-[1fr_auto] lg:grid-rows-[2fr_1fr] gap-4 p-4">
        {/* Map Container with Route Details Overlay */}
        <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden pointer-events-none">
          <RouteMap selectedRoute={selectedRoute} routes={routes} />
          
          {/* Map Controls Container */}
          <div className="absolute inset-x-0 top-0 h-16">
            <div className="absolute left-4 top-4 flex gap-2">
              {/* Mobile Menu Button */}
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
                  <RouteList
                    routes={routes}
                    selectedRouteId={selectedRoute?.id}
                    onRouteSelect={handleRouteSelect}
                    isMobile
                    isExpanded={isRouteListExpanded}
                    onExpandedChange={setIsRouteListExpanded}
                  />
                </SheetContent>
              </Sheet>

              {/* New Route Button */}
              <Button
                className="shadow-lg pointer-events-auto"
                variant="default"
                onClick={() => setShowNewRouteModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">New Route</span>
              </Button>
            </div>
          </div>
          
          {/* Route Details Overlay - Desktop */}
          {selectedRoute && (
            <div className="absolute right-4 h-fit top-4 w-full max-w-[400px] transition-all hidden lg:block">
              <RouteDetails 
                route={selectedRoute} 
              />
            </div>
          )}
        </div>
        
        {/* Active Routes List - Desktop */}
        <div className="hidden md:block z-20">
          <RouteList
            routes={routes}
            selectedRouteId={selectedRoute?.id}
            onRouteSelect={handleRouteSelect}
            isExpanded={isRouteListExpanded}
            onExpandedChange={setIsRouteListExpanded}
          />
        </div>

        {/* Route Details - Mobile */}
        {selectedRoute && (
          <Sheet 
            open={!!selectedRoute} 
            modal={false}
          >
            <SheetContent 
              side="bottom" 
              className="h-[80vh] lg:hidden p-0 bg-background/95 backdrop-blur-sm"
            >
              <RouteDetails 
                route={selectedRoute} 
                className="h-full rounded-none bg-transparent"
              />
            </SheetContent>
          </Sheet>
        )}
      </div>

      <NewRouteModal 
        open={showNewRouteModal}
        onOpenChange={setShowNewRouteModal}
        onRouteCreated={refresh}
      />
    </MapProvider>
  );
}