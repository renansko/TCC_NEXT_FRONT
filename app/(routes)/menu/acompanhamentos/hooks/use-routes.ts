import { useState, useEffect } from 'react';
import type { Route } from '../types';
import { routesService } from '../services/routes.service';

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  async function loadRoutes() {
    try {
      setLoading(true);
      const data = await routesService.fetchRoutes();
      setRoutes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load routes'));
    } finally {
      setLoading(false);
    }
  }

  async function createRoute(routeData: Partial<Route>) {
    try {
      const newRoute = await routesService.createRoute(routeData);
      setRoutes(prev => [...prev, newRoute]);
      return newRoute;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create route');
    }
  }

  async function updateRoute(id: string, updates: Partial<Route>) {
    try {
      const updatedRoute = await routesService.updateRoute(id, updates);
      setRoutes(prev => 
        prev.map(route => route.id === id ? updatedRoute : route)
      );
      return updatedRoute;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update route');
    }
  }

  return {
    routes,
    loading,
    error,
    createRoute,
    updateRoute,
    refresh: loadRoutes,
  };
} 