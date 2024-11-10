export interface Location {
  lat: number;
  lng: number;
}

export interface RoutePoint extends Location {
  timestamp: Date;
}

export interface Driver {
  id: string;
  name: string;
  status: 'available' | 'on_route' | 'off_duty';
  license: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  currentDriver?: Driver;
  fuelLevel: number;
  lastMaintenance: Date;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  coordinates: Location;
}

export interface RouteStatus {
  code: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  label: string;
  color: string;
}

export interface Route {
  id: string;
  name: string;
  status: RouteStatus;
  vehicle?: Vehicle;
  driver?: Driver;
  client: Client;
  origin: {
    address: string;
    location: Location;
  };
  destination: {
    address: string;
    location: Location;
  };
  currentLocation?: Location;
  distance: {
    total: number;
    completed: number;
    unit: 'km' | 'mi';
  };
  time: {
    departure: Date;
    estimated_arrival: Date;
    duration: number;
  };
  path: {
    completed: Location[];
    remaining: Location[];
  };
  googleMapsData?: google.maps.DirectionsResult;
} 