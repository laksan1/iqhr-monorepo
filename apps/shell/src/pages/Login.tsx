import { Form } from 'antd';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from 'ui-kit';
import { DEFAULT_CABINET_PATH } from '../constants/paths';
import { useAuth } from '../services/auth';
import type { RedirectLocationState } from '../types/navigation';
import { DEMO_LOGIN, DEMO_LOGIN_LABEL } from './demoLogin';
import styles from './Login.module.css';

type LoginValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm<LoginValues>();
  const [error, setError] = useState<string | null>(null);
  const [fieldsLocked, setFieldsLocked] = useState(true);
  const from =
    (location.state as RedirectLocationState | null)?.from?.pathname ?? DEFAULT_CABINET_PATH;

  const unlockFields = () => {
    setFieldsLocked(false);
  };

  const submitLogin = async (values: LoginValues) => {
    setError(null);
    try {
      await login(values.username, values.password);
      navigate(from, { replace: true });
    } catch {
      setError('Не удалось войти. Проверьте данные.');
    }
  };

  const loginWithDemo = async () => {
    unlockFields();
    const values = {
      username: DEMO_LOGIN.username,
      password: DEMO_LOGIN.password,
    };
    form.setFieldsValue(values);
    await submitLogin(values);
  };

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
        <p className={styles.hint}>
          Демо: любой логин и пароль от 4 символов. Кнопка ниже подставляет тестовые данные без
          предупреждений Chrome.
        </p>
        <Form form={form} layout="vertical" autoComplete="off" onFinish={submitLogin}>
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input
              id="iqhr-login"
              name="iqhr-login"
              placeholder="admin"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              readOnly={fieldsLocked}
              onFocus={unlockFields}
              data-1p-ignore
              data-lpignore="true"
              data-bwignore
              data-form-type="other"
            />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 4, message: 'Минимум 4 символа' },
            ]}
          >
            <Input.Password
              id="iqhr-secret"
              name="iqhr-secret"
              placeholder="••••"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              readOnly={fieldsLocked}
              onFocus={unlockFields}
              data-1p-ignore
              data-lpignore="true"
              data-bwignore
              data-form-type="other"
            />
          </Form.Item>
          {error ? <p className={styles.error}>{error}</p> : null}
          <div className={styles.actions}>
            <Button htmlType="submit" block>
              Войти
            </Button>
            <Button type="default" block onClick={() => void loginWithDemo()}>
              Демо-вход ({DEMO_LOGIN_LABEL})
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
