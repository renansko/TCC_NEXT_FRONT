import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, User, MapPin, Clock, X } from "lucide-react";
import type { Route } from "../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMap } from "../contexts/map-context";

interface RouteDetailsProps {
  className?: string;
}

export function RouteDetails({  className}: RouteDetailsProps) {
  const { state: { selectedRouteInfo }} = useMap(); 

  if (!selectedRouteInfo) return null;
  const progressPercent = 0
  return (
    <Card className={cn("shadow-lg transition-all pointer-events-auto", className)}>
      <Accordion type="single" collapsible defaultValue="details">
        <AccordionItem value="details" className="border-0">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold text-left">{selectedRouteInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRouteInfo.source.name}</p>
                </div>
              </div>
            </div>
          </AccordionTrigger>

          {/* Progress bar - Always visible */}
          <div className="px-4 py-2 border-t border-b">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium">{Math.round(progressPercent)}%</span>
            </div>
          </div>

          <AccordionContent>
            <div className="p-4">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4 pt-4">
                    <InfoItem
                      icon={MapPin}
                      label="Origin"
                      value={selectedRouteInfo?.source.name}
                    />
                    <InfoItem
                      icon={MapPin}
                      label="Destination"
                      value={selectedRouteInfo?.destination.name}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InfoItem
                        icon={Clock}
                        label="Departure"
                        // value={format(route.updated_at, "HH:mm")}
                      />
                      <InfoItem
                        icon={Clock}
                        label="Arrival"
                        // value={format(route.duration, "HH:mm")}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline">
                  <div className="pt-4">
                    Timeline content coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="actions">
                  <div className="pt-4 space-y-2">
                    <Button className="w-full" variant="secondary">
                      Contact Driver
                    </Button>
                    <Button className="w-full" variant="secondary">
                      View Full Details
                    </Button>
                    <Button className="w-full" variant="destructive">
                      Cancel Route
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value?: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium truncate">{value || "-"}</div>
      </div>
    </div>
  );
} 