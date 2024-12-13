import type { Route, Location } from '../types';
import { mockRoutes, simulateRouteUpdate } from '../data/mock';

class RoutesService {
  private static instance: RoutesService;
  private subscribers: Map<string, Set<(route: Route) => void>>;
  private mockUpdateInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.subscribers = new Map();
    this.startMockUpdates();
  }

  static getInstance(): RoutesService {
    if (!this.instance) {
      this.instance = new RoutesService();
    }
    return this.instance;
  }

  private startMockUpdates() {
    this.mockUpdateInterval = setInterval(() => {
      mockRoutes.forEach(route => {
        if (route.status?.code === 'in_progress') {
          const updatedRoute = simulateRouteUpdate(route);
          this.notifySubscribers(route.id, updatedRoute);
        }
      });
    }, 5000);
  }

  async fetchRoutes(): Promise<Route[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockRoutes;
  }

  async fetchRoute(id: string): Promise<Route> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const route = mockRoutes.find(r => r.id === id);
    if (!route) throw new Error('Route not found');
    return route;
  }

  async createRoute(routeData: Partial<Route>): Promise<Route> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newRoute: Route = {
      ...mockRoutes[0], // Use first mock route as template
      ...routeData,
      id: `route-${Date.now()}`,
    };
    mockRoutes.push(newRoute);
    return newRoute;
  }

  async updateRoute(id: string, updates: Partial<Route>): Promise<Route> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const routeIndex = mockRoutes.findIndex(r => r.id === id);
    if (routeIndex === -1) throw new Error('Route not found');
    
    mockRoutes[routeIndex] = {
      ...mockRoutes[routeIndex],
      ...updates,
    };
    return mockRoutes[routeIndex];
  }

  subscribeToRoute(routeId: string, callback: (route: Route) => void) {
    if (!this.subscribers.has(routeId)) {
      this.subscribers.set(routeId, new Set());
    }
    this.subscribers.get(routeId)?.add(callback);

    return () => {
      this.subscribers.get(routeId)?.delete(callback);
    };
  }

  private notifySubscribers(routeId: string, route: Route) {
    this.subscribers.get(routeId)?.forEach(callback => {
      callback(route);
    });
  }

  cleanup() {
    if (this.mockUpdateInterval) {
      clearInterval(this.mockUpdateInterval);
    }
  }
}

export const routesService = RoutesService.getInstance();