import { DirectionsResponseData, FindPlaceFromTextResponseData } from '@googlemaps/google-maps-services-js';
import { Route, CreateRouteRequest } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export class MapsService {
  static async searchPlaces(text: string): Promise<FindPlaceFromTextResponseData> {
    const response = await fetch(`${API_URL}/places?text=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error('Failed to search places');
    }
    return response.json();
  }

  static async getDirections(originId: string, destinationId: string): Promise<DirectionsResponseData & {request: Request}> {
    const queryParams = new URLSearchParams({
      originId,
      destinationId,
    });
    
    const response = await fetch(`${API_URL}/directions?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to get directions');
    }
    return response.json();
  }

  static async createRoute(data: CreateRouteRequest): Promise<Route> {
    const response = await fetch(`${API_URL}/routes`, {
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

  static async getRoutes(): Promise<Route[]> {
    const response = await fetch(`${API_URL}/routes`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
    }
    return response.json();
  }

  async getRouteProgress(origin: { o1: {lat: number, lng: number}, o2: string }, destination: { d1: {lat: number, lng: number}, d2: string }, options: {
    travelMode?: google.maps.TravelMode,
    unitSystem?: google.maps.UnitSystem,
    avoidTolls?: boolean,
    avoidHighways?: boolean,
    avoidFerries?: boolean,
  } = {
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidTolls: false,
    avoidHighways: false,
    avoidFerries: false,
  }) {
  //   const response = await fetch(`${API_URL}/route-progress?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`);
  //   if (!response.ok) {
  //     throw new Error('Failed to get route progress');
  //   }
  //   return response.json();
  // }
  const service = new google.maps.DistanceMatrixService();
  const o = new google.maps.LatLng(origin.o1.lat, origin.o1.lng);
  const d = new google.maps.LatLng(destination.d1.lat, destination.d1.lng);
  const response = await service.getDistanceMatrix({
    origins: [o, origin.o2],
    destinations: [d, destination.d2],
    travelMode: options.travelMode || google.maps.TravelMode.DRIVING,
    unitSystem: options.unitSystem || google.maps.UnitSystem.METRIC,
    avoidTolls: options.avoidTolls || false,
    avoidHighways: options.avoidHighways || false,
      avoidFerries: options.avoidFerries || false,
    });
    return response.rows[0].elements[0]
  }
}