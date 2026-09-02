import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Switch } from 'antd';
import { UsersApi } from 'api-client';
import { Link } from 'react-router-dom';
import { Button, Card, Select, Spinner } from 'ui-kit';
import styles from './account.module.scss';

const usersApi = new UsersApi();

export function SettingsPage() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['settings'],
    queryFn: async () => (await usersApi.getSettings()).data,
  });
  const mutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => usersApi.updateSettings(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });

  if (query.isLoading) return <Spinner />;

  return (
    <div className={styles.page}>
      <Link to="..">
        <Button type="text">← К профилю</Button>
      </Link>
      <Card title="Настройки">
        <Form
          layout="vertical"
          initialValues={query.data}
          onFinish={(values) => mutation.mutate(values)}
        >
          <Form.Item name="language" label="Язык">
            <Select
              options={[
                { value: 'ru', label: 'Русский' },
                { value: 'en', label: 'English' },
              ]}
            />
          </Form.Item>
          <Form.Item name="theme" label="Тема">
            <Select
              options={[
                { value: 'light', label: 'Светлая' },
                { value: 'dark', label: 'Тёмная' },
                { value: 'system', label: 'Системная' },
              ]}
            />
          </Form.Item>
          <Form.Item name="emailNotifications" label="Email-уведомления" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="pushNotifications" label="Push-уведомления" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Button htmlType="submit" loading={mutation.isPending}>
            Сохранить настройки
          </Button>
        </Form>
      </Card>
    </div>
  );
}
