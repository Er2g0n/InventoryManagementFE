
import type React from "react";
import { Button, Result } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/ErrorBoundary";

interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

const PageErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  return (
    <Result
      status="warning"
      title="Page Error"
      subTitle="Sorry, there was a problem loading this page."
      extra={[
        <Link to="/" key="home">
          <Button type="primary" icon={<HomeOutlined />}>
            Back to Home
          </Button>
        </Link>,
        <Button
          key="reload"
          icon={<ReloadOutlined />}
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
      ]}
    >
      {error && (
        <div className="tw:mt-4 tw:p-4 tw:bg-gray-50 tw:rounded-md tw:border tw:border-gray-200">
          <p className="tw:font-medium">Error message:</p>
          <p className="tw:text-red-500">{error.message}</p>
        </div>
      )}
    </Result>
  );
};

const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<PageErrorFallback />}>{children}</ErrorBoundary>
  );
};

export default PageErrorBoundary;
