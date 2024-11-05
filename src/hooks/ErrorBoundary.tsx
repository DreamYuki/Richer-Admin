import React, { useState, useEffect, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      console.error("Error caught by boundary: ", event.error);
      setHasError(true);
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection caught by boundary: ", event.reason);
      setHasError(true);
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);

  if (hasError) {
    return <h1>发生了错误，请刷新页面或稍后重试。</h1>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;

// 用法示例：
// <ErrorBoundary>
//   <YourChartComponent />
// </ErrorBoundary>
