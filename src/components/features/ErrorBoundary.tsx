import { Component, type ReactNode } from 'react';
interface Props { children: ReactNode; }
interface State { failed: boolean; }
export default class ErrorBoundary extends Component<Props, State> {
 state: State = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 componentDidCatch(error: Error) { console.error('Dictionary interface error', error); }
 render() { return this.state.failed ? <div className="panel mx-auto my-16 max-w-lg p-8"><h1 className="section-title">The dictionary could not be displayed</h1><p className="my-4 text-muted-foreground">Your stored data has not been deleted. Reload this page to try again.</p><button className="btn-primary" onClick={() => globalThis.location.reload()}>Reload dictionary</button></div> : this.props.children; }
}
