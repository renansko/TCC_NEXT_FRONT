import useSWR from 'swr';
import { CreateRouteRequest, Route } from '../types';
import { createRoute, updateRouteLocation } from '../actions';
const ROUTES_KEY = '/routes';

export function useRoutes() {
  const { data: routes, error, mutate  } = useSWR<Route[]>(ROUTES_KEY, async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes`);
    if (!response.ok) throw new Error('Failed to fetch routes');
    return response.json();
  }, {
    refreshInterval: 5000, // Poll every 5 seconds for updates
  });

  const addRoute = async (routeData: CreateRouteRequest) => {
    try {
      const newRoute = await createRoute(routeData);
      await mutate([...(routes || []), newRoute], false);
      return newRoute;
    } catch (error) {
      throw new Error('Failed to create route');
    }
  };

  const updateLocation = async (routeId: string, location: { lat: number; lng: number }) => {
    try {
      const updatedRoute = await updateRouteLocation(routeId, location);
      await mutate(
        routes?.map(route => 
          route.id === routeId 
            ? { ...route, currentLocation: location }
            : route
        ),
        false
      );
      return updatedRoute;
    } catch (error) {
      throw new Error('Failed to update route location');
    }
  };

  return {
    routes: routes || [],
    isLoading: !error && !routes,
    isError: error,
    addRoute,
    updateLocation,
    mutate,
    refresh: mutate,
  };
}