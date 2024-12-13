"use client";

import { useEffect } from "react";
import { useMap } from "../contexts/map-context";
import type { Route } from "../types";

interface RouteMapProps {
  routes: Route[];
  selectedRoute: Route | null;
}

export function RouteMap({ selectedRoute, routes }: RouteMapProps) {
  const { mapActions: { addRoute, removeRoute, fitBounds }} = useMap();

  useEffect(() => {
    // Clear existing routes
    routes.forEach(route => removeRoute(route.id));

    // Add routes and fit bounds
    if (selectedRoute) {
      addRoute(selectedRoute);
      fitBounds([selectedRoute]);
    } else {
      routes.forEach(route => addRoute(route));
      fitBounds(routes);
    }
  }, [routes, selectedRoute, addRoute, removeRoute, fitBounds]);

  return null;
} 