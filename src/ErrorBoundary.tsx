"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button, Result, Typography } from "antd";
import { ReloadOutlined, BugOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, render the default error UI
      return (
        <Result
          status="error"
          title="Component Error"
          subTitle="Sorry, something went wrong in this page."
          icon={<BugOutlined />}
          extra={[
            <Button
              key="reload"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>,
            <Button key="reset" onClick={this.handleReset}>
              Try Again
            </Button>
          ]}
        >
          <div className="tw:mt-4 tw:p-4 tw:bg-gray-50 tw:rounded-md tw:border tw:border-gray-200">
            <Paragraph strong>Error Details:</Paragraph>
            <Text type="danger">{this.state.error?.toString()}</Text>
            {this.state.errorInfo && (
              <div className="tw:mt-2">
                <Paragraph strong>Component Stack:</Paragraph>
                <pre className="tw:bg-gray-100 tw:p-2 tw:rounded tw:overflow-auto tw:text-xs tw:max-h-40">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
