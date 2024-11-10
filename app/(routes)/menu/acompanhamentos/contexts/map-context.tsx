"use client";

import { createContext, useContext, useRef, useEffect, useState } from 'react';
import type { Route, Location } from '../types';
import { MAP_STYLES } from '../constants';

interface MapContextValue {
  map: google.maps.Map | null;
  isLoading: boolean;
  addRoute: (route: Route) => void;
  updateRoutePosition: (routeId: string, position: Location) => void;
  removeRoute: (routeId: string) => void;
  panTo: (location: Location) => void;
  fitBounds: (routes: Route[]) => void;
  resetView: () => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const routesRef = useRef<Map<string, google.maps.Polyline>>(new Map());
  const isCtrlPressed = useRef(false);

  const defaultCenter = { lat: -23.550520, lng: -46.633309 }; // São Paulo

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        isCtrlPressed.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        isCtrlPressed.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle map container events
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const container = mapContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (isCtrlPressed.current) {
        e.preventDefault(); // Prevent browser zoom
        
        if (map) {
          const center = map.getCenter()!;
          const zoom = map.getZoom()!;
          
          // Determine zoom direction
          if (e.deltaY < 0) {
            map.setZoom(zoom + 0.5);
          } else {
            map.setZoom(zoom - 0.5);
          }
          
          map.setCenter(center);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Right click or ctrl+left click for map rotation
      if (e.button === 2 || (e.button === 0 && isCtrlPressed.current)) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault(); // Prevent context menu
    };

    // Add passive: false to allow preventDefault() on wheel events
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('contextmenu', handleContextMenu);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [map]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || map) return;

    const initMap = () => {
      if (!window.google?.maps) {
        console.error('Google Maps not loaded');
        return;
      }

      try {
        const mapInstance = new google.maps.Map(mapContainerRef.current!, {
          zoom: 12,
          center: { lat: -23.550520, lng: -46.633309 }, // São Paulo
          styles: MAP_STYLES.DEFAULT,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative', // Enables scroll zoom only with Ctrl key
          minZoom: 3, // Prevent zooming out too far
          maxZoom: 20, // Prevent zooming in too far
          restriction: {
            latLngBounds: {
              north: 5.272, // Brazil bounds
              south: -33.742,
              west: -73.992,
              east: -34.793,
            },
            strictBounds: true,
          },
        });

        // Add keyboard shortcuts
        google.maps.event.addDomListener(window, 'keydown', (e: KeyboardEvent) => {
          if (mapInstance) {
            const zoom = mapInstance.getZoom()!;
            
            // Ctrl + Plus: Zoom in
            if (e.ctrlKey && e.key === '+') {
              e.preventDefault();
              mapInstance.setZoom(zoom + 1);
            }
            
            // Ctrl + Minus: Zoom out
            if (e.ctrlKey && e.key === '-') {
              e.preventDefault();
              mapInstance.setZoom(zoom - 1);
            }
            
            // Ctrl + 0: Reset zoom
            if (e.ctrlKey && e.key === '0') {
              e.preventDefault();
              mapInstance.setZoom(12);
            }
          }
        });

        setMap(mapInstance);
        
        // Force a resize after initialization
        setTimeout(() => {
          mapInstance.setCenter({ lat: -23.550520, lng: -46.633309 });
          window.google.maps.event.trigger(mapInstance, 'resize');
        }, 100);

      } catch (error) {
        console.error('Error initializing map:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (window.google?.maps) {
      initMap();
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (map) {
        markersRef.current.forEach(marker => marker.setMap(null));
        routesRef.current.forEach(route => route.setMap(null));
        markersRef.current.clear();
        routesRef.current.clear();
      }
    };
  }, [map]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <MapContext.Provider value={{
        map,
        isLoading,
        addRoute: (route) => {
          if (!map) return;

          // Add route polyline
          const path = [...route.path.completed, ...route.path.remaining];
          const polyline = new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map,
          });

          // Add vehicle marker
          if (route.currentLocation) {
            const marker = new google.maps.Marker({
              position: route.currentLocation,
              map,
              title: `${route.vehicle?.plate} - ${route.driver?.name}`,
            });
            markersRef.current.set(route.id, marker);
          }

          routesRef.current.set(route.id, polyline);
        },
        updateRoutePosition: (routeId, position) => {
          const marker = markersRef.current.get(routeId);
          if (marker) {
            marker.setPosition(position);
          }
        },
        removeRoute: (routeId) => {
          const marker = markersRef.current.get(routeId);
          const route = routesRef.current.get(routeId);
          
          if (marker) {
            marker.setMap(null);
            markersRef.current.delete(routeId);
          }
          
          if (route) {
            route.setMap(null);
            routesRef.current.delete(routeId);
          }
        },
        panTo: (location) => {
          map?.panTo(location);
        },
        fitBounds: (routes) => {
          if (!map || routes.length === 0) return;

          const bounds = new google.maps.LatLngBounds();
          routes.forEach(route => {
            bounds.extend(route.origin.location);
            bounds.extend(route.destination.location);
            if (route.currentLocation) {
              bounds.extend(route.currentLocation);
            }
          });
          map.fitBounds(bounds);
        },
        resetView: () => {
          if (!map) return;

          // Try to get user's location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                map.setZoom(12);
                map.panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => {
                // If geolocation fails, center on default location
                map.setZoom(12);
                map.panTo(defaultCenter);
              }
            );
          } else {
            // If geolocation is not supported, center on default location
            map.setZoom(12);
            map.panTo(defaultCenter);
          }
        },
      }}>
        {children}
      </MapContext.Provider>
    </div>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
} 