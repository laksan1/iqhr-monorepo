import { Form } from 'antd';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from 'ui-kit';
import { useAuth } from '../auth';
import styles from './Login.module.css';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/candidates';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <span className={styles.badge}>IQHR</span>
        <h1>Единое пространство для найма</h1>
        <p>Кандидаты, вакансии и личный кабинет в модульном монолите с мгновенным HMR.</p>
      </div>
      <Card className={styles.panel}>
        <h2>Вход в платформу</h2>
        <p className={styles.hint}>Любой логин и пароль от 4 символов — для демо.</p>
        <Form
          layout="vertical"
          onFinish={async (values: { username: string; password: string }) => {
            setError(null);
            try {
              await login(values.username, values.password);
              navigate(from, { replace: true });
            } catch {
              setError('Не удалось войти. Проверьте данные.');
            }
          }}
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input placeholder="admin" autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 4, message: 'Минимум 4 символа' },
            ]}
          >
            <Input.Password placeholder="••••" autoComplete="current-password" />
          </Form.Item>
          {error ? <p className={styles.error}>{error}</p> : null}
          <Button htmlType="submit" block>
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
}
