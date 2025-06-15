
import React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  onReset?: () => void;
};

type State = {
  hasError: boolean;
  error: any;
  errorInfo: any;
};

export class DiscussionErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("DiscussionErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <Card className="max-w-2xl mx-auto mt-8 border-red-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-red-800">Discussion Interrupted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 text-center">
                The symposium encountered an unexpected issue. Don't worry - your progress may be preserved.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 font-medium mb-1">Error Details:</p>
                <p className="text-xs text-red-600 font-mono">
                  {this.state.error?.toString() || "Unknown error occurred"}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={this.handleReset}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore Symposium
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Agora
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                If the issue persists, try refreshing the page or resetting your discussion configuration.
              </p>
            </CardContent>
          </Card>
        )
      );
    }

    return this.props.children;
  }
}
