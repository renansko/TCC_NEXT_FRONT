"use client";

import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMap } from "../contexts/map-context";
import { mockRoutes } from "../data/mock";
import type { Route, Location } from "../types";

interface NewRouteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRouteCreated?: () => void;
}

export function NewRouteModal({ open, onOpenChange, onRouteCreated }: NewRouteModalProps) {
  const { map, addRoute, removeRoute } = useMap();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewRoute, setPreviewRoute] = useState<{
    origin: { address: string; location: Location };
    destination: { address: string; location: Location };
  } | null>(null);

  // Mock geocoding function
  async function geocodeAddress(address: string): Promise<Location> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock coordinates around São Paulo
    const baseLocation = { lat: -23.550520, lng: -46.633309 };
    return {
      lat: baseLocation.lat + (Math.random() - 0.5) * 0.1,
      lng: baseLocation.lng + (Math.random() - 0.5) * 0.1,
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const source = formData.get("source")?.toString();
      const destination = formData.get("destination")?.toString();

      if (!source || !destination) {
        throw new Error("Please provide both origin and destination addresses");
      }

      // Simulate geocoding
      const [originLocation, destinationLocation] = await Promise.all([
        geocodeAddress(source),
        geocodeAddress(destination),
      ]);

      const preview = {
        origin: { address: source, location: originLocation },
        destination: { address: destination, location: destinationLocation },
      };

      setPreviewRoute(preview);

      // Update map preview
      if (map) {
        removeRoute("preview");
        addRoute({
          id: "preview",
          name: "Preview Route",
          status: {
            code: "pending",
            label: "Preview",
            color: "yellow",
          },
          origin: preview.origin,
          destination: preview.destination,
          client: mockRoutes[0].client,
          distance: {
            total: 100,
            completed: 0,
            unit: "km",
          },
          time: {
            departure: new Date(),
            estimated_arrival: new Date(Date.now() + 3600000),
            duration: 60,
          },
          path: {
            completed: [],
            remaining: [preview.origin.location, preview.destination.location],
          },
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateRoute() {
    if (!previewRoute) return;

    try {
      setIsLoading(true);

      const newRoute: Route = {
        ...mockRoutes[0], // Use first mock route as template
        id: `route-${Date.now()}`,
        name: `${previewRoute.origin.address} - ${previewRoute.destination.address}`,
        origin: previewRoute.origin,
        destination: previewRoute.destination,
        status: {
          code: "pending",
          label: "Pendente",
          color: "yellow",
        },
        time: {
          departure: new Date(),
          estimated_arrival: new Date(Date.now() + 3600000),
          duration: 60,
        },
        path: {
          completed: [],
          remaining: [previewRoute.origin.location, previewRoute.destination.location],
        },
      };

      // Add to mock routes
      mockRoutes.push(newRoute);

      onOpenChange(false);
      onRouteCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create route");
    } finally {
      setIsLoading(false);
    }
  }

  // @TODO: Voce pode add a api do goolgle maps para input de endereço
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Route</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Origin</Label>
            <Input
              id="source"
              name="source"
              placeholder="Enter origin address"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              name="destination"
              placeholder="Enter destination address"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              Calculate Route
            </Button>
            {previewRoute && (
              <Button
                type="button"
                variant="secondary"
                disabled={isLoading}
                onClick={handleCreateRoute}
              >
                Create Route
              </Button>
            )}
          </div>

          {previewRoute && (
            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="font-medium">Origin:</span>{" "}
                {previewRoute.origin.address}
              </div>
              <div>
                <span className="font-medium">Destination:</span>{" "}
                {previewRoute.destination.address}
              </div>
              <div>
                <span className="font-medium">Estimated Distance:</span> ~100 km
              </div>
              <div>
                <span className="font-medium">Estimated Duration:</span> ~1 hour
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
} 