import { Route, CreateRouteRequest } from './types';

export async function createRoute(data: CreateRouteRequest) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create route');
  }

  return response.json();
}

export async function getRoutes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch routes');
  }

  return response.json() as Promise<Route[]>;
}

export async function updateRouteLocation(routeId: string, location: { lat: number; lng: number }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes/${routeId}/location`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location }),
  });

  if (!response.ok) {
    throw new Error('Failed to update route location');
  }

  return response.json();
}