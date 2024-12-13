"use client";

import { createContext, useContext, useRef, useEffect, useReducer, useCallback, useState } from "react";
import useSWR from "swr";
import { Route } from "@/app/(routes)/menu/acompanhamentos/types";
import { MapContextValue } from "@/app/(routes)/menu/acompanhamentos/types/map-types";
import { MAP_STYLES } from "../constants";
import { mapReducer, initialMapState, MapState, MapAction } from "./map-reducer";
import { socket } from "@/app/utils/socket-io";
import { useInterval } from "@/app/hooks/useInterval";

const MapContext = createContext<{
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
  mapActions: MapContextValue;
} | null>(null);

const DEFAULT_CENTER = { lat: -23.55052, lng: -46.633309 }; // São Paulo
const DEFAULT_ZOOM = 12;

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const routesRef = useRef<Map<string, google.maps.Polyline>>(new Map());
  const [activeRoutes, setActiveRoutes] = useState<Set<string>>(new Set());

  // Fetch routes data
  const { data: routes, error, mutate } = useSWR<Route[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/routes`,
    fetcher
  );
  useEffect(() => {
    if (routes) {
      dispatch({ type: "SET_ROUTES", payload: routes });
    }
    if (error) {
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [routes, error]);

  const initializeMap = useCallback((mapDiv: HTMLDivElement) => {
    if (mapRef.current || !window.google?.maps) return;

    mapRef.current = new google.maps.Map(mapDiv, {
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER,
      styles: MAP_STYLES,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    dispatch({ type: "SET_MAP", payload: mapRef.current });
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const clearMapElements = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    routesRef.current.forEach(route => route.setMap(null));
    markersRef.current.clear();
    routesRef.current.clear();
  };

  const removeRoute = (routeId: string) => {
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith(routeId)) {
        marker.setMap(null);
        markersRef.current.delete(key);
      }
    });

    const route = routesRef.current.get(routeId);
    if (route) {
      route.setMap(null);
      routesRef.current.delete(routeId);
    }
  };

  const addRoute = useCallback((route: Route) => {
    if (!mapRef.current || !route.directions) return;

    // Decode the polyline
    const path = route.directions.routes.length > 0 ? google.maps.geometry.encoding.decodePath(
      route.directions.routes[0].overview_polyline.points
    ) : [];

    // Create the polyline
    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#2196F3",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: mapRef.current,
    });

    // Add markers
    const startMarker = new google.maps.Marker({
      position: route.source.location,
      map: mapRef.current,
      title: 'Origem',
      icon: {
        url: '/markers/start.png',
        scaledSize: new google.maps.Size(32, 32)
      }
    });

    const endMarker = new google.maps.Marker({
      position: route.destination.location,
      map: mapRef.current,
      title: 'Destino',
      icon: {
        url: '/markers/end.png',
        scaledSize: new google.maps.Size(32, 32)
      }
    });

    // Store references for cleanup
    routesRef.current.set(route.id, polyline);
    markersRef.current.set(`${route.id}-start`, startMarker);
    markersRef.current.set(`${route.id}-end`, endMarker);

    // Add car marker if route is active and has status
    if (route.status?.code === 'in_progress') {
      const carMarker = new google.maps.Marker({
        position: path[0], // Start at beginning of route
        map: mapRef.current,
        title: 'Veículo',
        icon: {
          url: '/markers/truck.png',
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      markersRef.current.set(`${route.id}-car`, carMarker);
      setActiveRoutes(prev => new Set(prev).add(route.id));
    }
  }, [mapRef]);

  // const hasRoute = (routeId: string) => {
  //   return markersRef.current.has(`${routeId}-start`) && markersRef.current.has(`${routeId}-end`);
  // };

  // const moveCar = (routeId: string, position: google.maps.LatLngLiteral) => {
  //   const carMarker = markersRef.current.get(`${routeId}-car`);
  //   if (carMarker) {
  //     carMarker.setPosition(position);
  //   }
  // };

  const mapActions: MapContextValue = {
    addRoute,
    removeRoute,
    initializeMap,
    updateRoutePosition: (routeId, position) => {
      const marker = markersRef.current.get(routeId);
      if (marker) {
        marker.setPosition(position);
      }
    },
    panTo: (location) => {
      mapRef.current?.panTo(location);
    },
    fitBounds: (routes) => {
      if (!mapRef.current || routes.length === 0) return;

      const bounds = new google.maps.LatLngBounds();
      routes.forEach((route) => {
        bounds.extend(route.source.location);
        bounds.extend(route.destination.location);
        if (route.currentLocation) {
          bounds.extend(route.currentLocation);
        }
      });
      mapRef.current.fitBounds(bounds);
    },
    resetView: () => {
      if (!mapRef.current) return;
      mapRef.current.setZoom(DEFAULT_ZOOM);
      mapRef.current.setCenter(DEFAULT_CENTER);
    },
    refresh: () => {
      mutate();
    },
    selectRouteInfo: (routeInfo: Route) => {
      dispatch({ type: "SET_SELECTED_ROUTE_INFO", payload: routeInfo });
    },
    clearMapElements,
  };

  // Simulate truck movement
  useInterval(() => {
    if (!mapRef.current || activeRoutes.size === 0) return;

    activeRoutes.forEach(routeId => {
      const route = routes?.find(r => r.id === routeId);
      if (!route || !route.directions) return;

      // Get path points from the route
      const path = google.maps.geometry.encoding.decodePath(
        route.directions.routes[0].overview_polyline.points
      );

      // Get current marker position
      const carMarker = markersRef.current.get(`${routeId}-car`);
      if (!carMarker) return;

      const currentPos = carMarker.getPosition();
      if (!currentPos) return;

      // Find next point in path
      const currentIndex = path.findIndex(point => 
        point.lat() === currentPos.lat() && 
        point.lng() === currentPos.lng()
      );

      if (currentIndex < path.length - 1) {
        const nextPoint = path[currentIndex + 1];
        carMarker.setPosition(nextPoint);
      } else {
        // Route completed
        activeRoutes.delete(routeId);
        setActiveRoutes(new Set(activeRoutes));
      }
    });
  }, 1000); // Update every second

  return (
      <MapContext.Provider value={{ state, dispatch, mapActions }}>
        {children}
      </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}
