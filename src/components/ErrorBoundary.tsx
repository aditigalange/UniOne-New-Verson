import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Something Went Wrong
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The application encountered an error. This might be due to Firebase configuration.
            </p>
            {this.state.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 mb-4">
                <p className="text-sm text-red-800 dark:text-red-200 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary-dark dark:bg-primary-light text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Reload Page
              </button>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                <p className="font-semibold mb-2">If the error persists:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Check <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">src/firebase/config.ts</code></li>
                  <li>Open browser console (F12) for more details</li>
                  <li>See TROUBLESHOOTING.md for help</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

