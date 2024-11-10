"use client";

import { useEffect } from "react";
import { useMap } from "../contexts/map-context";
import type { Route } from "../types";

interface RouteMapProps {
  routes: Route[];
  selectedRoute: Route | null;
}

export function RouteMap({ routes, selectedRoute }: RouteMapProps) {
  const { map, isLoading, addRoute, removeRoute, fitBounds, resetView } = useMap();

  useEffect(() => {
    if (!map || !routes.length || isLoading) return;

    // Clear existing routes
    routes.forEach(route => removeRoute(route.id));

    // Add all routes
    routes.forEach(route => addRoute(route));

    // If no route is selected, show all routes
    if (!selectedRoute) {
      fitBounds(routes);
    }
  }, [map, routes, isLoading, selectedRoute]);

  useEffect(() => {
    if (!map || isLoading) return;

    if (selectedRoute) {
      // Center map on selected route
      fitBounds([selectedRoute]);
    } else {
      // Reset view when no route is selected
      resetView();
    }
  }, [map, selectedRoute, isLoading]);

  return null;
} 