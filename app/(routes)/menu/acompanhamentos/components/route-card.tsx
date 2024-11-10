import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/Icons";
import type { Route } from "../types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface RouteCardProps {
  route: Route;
  isSelected?: boolean;
  onClick?: (selectedRoute: Route | null) => void;
  compact?: boolean;
}

export function RouteCard({ route, isSelected, onClick, compact }: RouteCardProps) {
  const progressPercent = (route.distance.completed / route.distance.total) * 100;

  const handleClick = () => {
    if (isSelected) {
      onClick?.(null);
    } else {
      onClick?.(route);
    }
  };

  if (compact) {
    return (
      <Card
        className={cn(
          "transition-all cursor-pointer hover:shadow-md pointer-events-auto",
          isSelected && "ring-2 ring-primary",
          "max-w-[300px]"
        )}
        onClick={handleClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icons.truck className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">{route.vehicle?.plate}</span>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                `bg-${route.status.color}-500/10 text-${route.status.color}-500`
              )}
            >
              {route.status.label}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">

            <div className="text-xs text-muted-foreground truncate">
              {route.driver?.name}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium">{Math.round(progressPercent)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "transition-all cursor-pointer hover:shadow-md pointer-events-auto max-w-[300px]",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icons.truck className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{route.vehicle?.plate}</span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "bg-opacity-10",
              `bg-${route.status.color}-500 text-${route.status.color}-500`
            )}
          >
            {route.status.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm">
              <div className="text-muted-foreground">Motorista</div>
              <div>{route.driver?.name}</div>
          </div>

          <div className="text-sm">
            <div className="text-muted-foreground">Cliente</div>
            <div>{route.client.name}</div>
          </div>
          </div>

          <div className="text-sm">
            <div className="text-muted-foreground">Progresso</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs">{Math.round(progressPercent)}%</span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <div className="text-muted-foreground">Saída</div>
              <div>{format(route.time.departure, "HH:mm")}</div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground">Chegada Prevista</div>
              <div>{format(route.time.estimated_arrival, "HH:mm")}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 