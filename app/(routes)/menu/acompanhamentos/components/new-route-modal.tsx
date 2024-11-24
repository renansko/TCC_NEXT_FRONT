"use client";

import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMap } from "../contexts/map-context";
import type { Route, Location } from "../types";

interface NewRouteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRouteCreated?: () => void;
}

export function NewRouteModal({ open, onOpenChange, onRouteCreated }: NewRouteModalProps) {
  const { mapActions: { addRoute, removeRoute }, state: { map, isLoading }} = useMap();
  const [error, setError] = useState<string | null>(null);
  const [previewRoute, setPreviewRoute] = useState<{
    origin: { address: string; location: Location };
    destination: { address: string; location: Location };
  } | null>(null);

  // Mock geocoding function
  async function geocodeAddress(address: string): Promise<Location> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(address);
    // Return mock coordinates around São Paulo
    const baseLocation = { lat: -23.550520, lng: -46.633309 };
    return {
      lat: baseLocation.lat + (Math.random() - 0.5) * 0.1,
      lng: baseLocation.lng + (Math.random() - 0.5) * 0.1,
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
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
          source: {
            name: preview.origin.address,
            location: preview.origin.location,
          },
          destination: {
            name: preview.destination.address,
            location: preview.destination.location,
          },
          distance: 100,
          duration: 60,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  async function handleCreateRoute() {
    if (!previewRoute) return;

    try {
      const newRoute: Route = {
        id: `route-${Date.now()}`,
        name: `${previewRoute.origin.address} - ${previewRoute.destination.address}`,
        source: {
          name: previewRoute.origin.address,
          location: previewRoute.origin.location,
        },
        destination: {
          name: previewRoute.destination.address,
          location: previewRoute.destination.location,
        },
        status: {
          code: "pending",
          label: "Pendente",
          color: "yellow",
        },
        distance: 100,
        duration: 60,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Add to mock routes
      addRoute(newRoute);

      onOpenChange(false);
      onRouteCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create route");
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
            <Label htmlFor="source">Origem</Label>
            <Input
              id="source"
              name="source"
              placeholder="Enter origin address"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destino</Label>
            <Input
              id="destination"
              name="destination"
              placeholder="Enter destination address"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              Calcular Rota
            </Button>
            {previewRoute && (
              <Button
                type="button"
                variant="secondary"
                disabled={isLoading}
                onClick={handleCreateRoute}
              >
                Criar Rota
              </Button>
            )}
          </div>

          {previewRoute && (
            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="font-medium">Origem:</span>{" "}
                {previewRoute.origin.address}
              </div>
              <div>
                <span className="font-medium">Destino:</span>{" "}
                {previewRoute.destination.address}
              </div>
              <div>
                <span className="font-medium">Distância estimada:</span> ~100 km
              </div>
              <div>
                <span className="font-medium">Duração estimada:</span> ~1 hora
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
} 