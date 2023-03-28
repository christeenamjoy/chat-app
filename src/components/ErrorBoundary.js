import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
  }

  render() {
    if (this.state.error) {
      // Create a custom fallback UI here
      return <h1>There seems to be a problem.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
