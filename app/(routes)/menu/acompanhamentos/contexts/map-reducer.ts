import { Route } from "@/app/(routes)/menu/acompanhamentos/types";

export interface MapState {
  selectedRouteId: string | null;
  selectedRouteInfo: Route | null;
  routes: Route[];
  isLoading: boolean;
  error: Error | null;
  map: google.maps.Map | null;
}

export type MapAction = 
  | { type: "SET_SELECTED_ROUTE_ID"; payload: string }
  | { type: "SET_SELECTED_ROUTE_INFO"; payload: Route }
  | { type: "SET_ROUTES"; payload: Route[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error }
  | { type: "SET_MAP"; payload: google.maps.Map }
  | { type: "RESET_STATE" };


export const initialMapState: MapState = {
  selectedRouteId: null,
  selectedRouteInfo: null,
  routes: [],
  isLoading: false,
  error: null,
  map: null,
};

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "SET_SELECTED_ROUTE_ID":
      return { ...state, selectedRouteId: action.payload };
    
    case "SET_SELECTED_ROUTE_INFO":
      return { ...state, selectedRouteInfo: action.payload };
    
    case "SET_ROUTES":
      return { ...state, routes: action.payload };
    
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload };
    
    case "RESET_STATE":
      return initialMapState;

    default:
      return state;
  }
} 