import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import styles from './ErrorBoundary.module.scss';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('IQHR error boundary', error, info);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <Card className={styles.card}>
        <h2>Не удалось загрузить модуль</h2>
        <p>{this.state.error.message}</p>
        <Button onClick={() => window.location.reload()}>Обновить страницу</Button>
      </Card>
    );
  }
}
