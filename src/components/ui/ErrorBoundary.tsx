
import React from "react";

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: any;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // Log the error for debugging
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="bg-red-50 p-8 rounded-xl border border-red-200 text-red-800">
            <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
            <div className="text-sm">{this.state.error?.toString()}</div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
