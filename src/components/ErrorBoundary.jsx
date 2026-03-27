import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: 'rgba(14, 165, 233, 0.05)',
          border: '2px solid rgba(14, 165, 233, 0.2)',
          borderRadius: '16px',
          margin: '20px'
        }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '12px' }}>Something went wrong</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
            Please refresh the page or try switching back to English.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
            style={{ padding: '12px 32px' }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
