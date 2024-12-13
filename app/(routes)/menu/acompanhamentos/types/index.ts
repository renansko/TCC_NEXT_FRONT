import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';

export interface Location {
  lat: number;
  lng: number;
}

export interface RoutePoint extends Location {
  timestamp: Date;
}

export interface RouteStatus {
  code: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  label: string;
  color: string;
}

export interface Route {
  id: string;
  name: string;
  status?: RouteStatus;
  source: {
    name: string;
    location: Location;
  };
  destination: {
    name: string;
    location: Location;
  };
  distance: number;
  duration: number;
  currentLocation?: Location;
  directions?: DirectionsResponseData & { request: Request };
  created_at: Date;
  updated_at: Date;
}

export interface CreateRouteRequest {
  name: string;
  source_id: string;
  destination_id: string;
}
