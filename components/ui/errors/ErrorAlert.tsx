import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../alert";

interface ErrorAlertProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export function ErrorAlert({ title, description, onRetry }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="max-w-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-4">
        <p>{description}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="w-fit"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}