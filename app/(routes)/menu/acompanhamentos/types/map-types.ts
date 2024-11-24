import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { Route } from "../types";

export interface MarkerOptions extends google.maps.MarkerOptions {
  position: google.maps.LatLngLiteral;
}

export interface AddRouteWithIconsOptions {
  routeId: string;
  startMarkerOptions: MarkerOptions;
  endMarkerOptions: MarkerOptions;
  carMarkerOptions: MarkerOptions;
  directionsResponseData: DirectionsResponseData & { request: Request };
}


export interface MapContextValue {
  addRoute: (route: Route) => void;
  removeRoute: (routeId: string) => void;
  updateRoutePosition: (routeId: string, position: google.maps.LatLngLiteral) => void;
  panTo: (location: google.maps.LatLngLiteral) => void;
  fitBounds: (routes: Route[]) => void;
  resetView: () => void;
  refresh: () => void;
  selectRouteInfo: (routeInfo: Route) => void;
  initializeMap: (mapDiv: HTMLDivElement) => void;
  clearMapElements: () => void;
} 