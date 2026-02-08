import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoBack = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint-light to-card p-4">
          <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-card text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Что-то пошло не так
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу или вернуться на главную.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="bg-muted rounded-lg p-4 mb-6 text-left overflow-auto max-h-32">
                <code className="text-xs text-destructive break-all">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={this.handleGoBack}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Button>
              <Button
                onClick={this.handleReload}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Перезагрузить
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
