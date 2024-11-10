import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Route } from "../types";
import { RouteCard } from "./route-card";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

interface RouteListProps {
  routes: Route[];
  selectedRouteId?: string;
  onRouteSelect: (route: Route | null) => void;
  className?: string;
  isMobile?: boolean;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function RouteList({
  routes,
  selectedRouteId,
  onRouteSelect,
  className,
  isMobile = false,
  isExpanded,
  onExpandedChange,
}: RouteListProps) {
  return (
    <div className="absolute bottom-0 left-0 z-10 w-[60%]">
      <Accordion
        type="single"
        collapsible
        value={isExpanded ? "routes" : undefined}
        onValueChange={(value) => onExpandedChange(value === "routes")}
        className={cn(
          "bg-background/95 backdrop-blur-sm transition-all duration-300 rounded-tr-lg",
          className
        )}
      >
        <AccordionItem value="routes" className="border-0">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-baseline gap-4">
                <h2 className="text-lg font-semibold">Active Routes</h2>
                <p className="text-sm text-muted-foreground">
                  {routes.length} routes in progress
                </p>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="h-[calc(100vh/3)]">
            <ScrollArea className="h-full w-full" type="hover">
              <div className="p-4">
                {isMobile ? (
                  // Mobile: Vertical scroll with single column
                  <div className="flex flex-col gap-4">
                    {routes.map((route) => (
                      <RouteCard
                        key={route.id}
                        route={route}
                        isSelected={route.id === selectedRouteId}
                        onClick={() =>
                          onRouteSelect(
                            route.id === selectedRouteId ? null : route
                          )
                        }
                        compact
                      />
                    ))}
                  </div>
                ) : (
                  // Desktop: Horizontal scroll with fixed width cards
                  <div className="flex gap-4 min-w-0 w-full">
                    {routes.map((route) => (
                      <div key={route.id} className="w-[300px] shrink-0">
                        <RouteCard
                          route={route}
                          isSelected={route.id === selectedRouteId}
                          onClick={() =>
                            onRouteSelect(
                              route.id === selectedRouteId ? null : route
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Only show horizontal scrollbar on desktop */}
              {!isMobile && <ScrollBar orientation="horizontal" />}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
