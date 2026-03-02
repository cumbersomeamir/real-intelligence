/**
 * @file Client-side error boundary.
 */

'use client';

import { Component } from 'react';

/**
 * React error boundary component.
 */
export default class ErrorBoundary extends Component {
  /**
   * Initializes component state.
   * @param {Object} props - Component props.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state on render errors.
   * @returns {{hasError:boolean}} Updated state.
   */
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /**
   * Handles captured errors.
   * @param {Error} error - Error object.
   */
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary captured:', error);
  }

  /**
   * Renders child tree or fallback UI.
   * @returns {JSX.Element} Render output.
   */
  render() {
    if (this.state.hasError) {
      return <div className="rounded-xl border border-risk-500/30 bg-risk-500/10 p-4">Something went wrong.</div>;
    }

    return this.props.children;
  }
}
