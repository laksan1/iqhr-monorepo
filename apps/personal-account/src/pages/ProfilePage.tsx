import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form } from 'antd';
import { CandidatesApi, UsersApi, VacanciesApi } from 'api-client';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Spinner } from 'ui-kit';
import styles from './account.module.css';

const usersApi = new UsersApi();
const candidatesApi = new CandidatesApi();
const vacanciesApi = new VacanciesApi();

export function ProfilePage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await usersApi.getProfile();
      return data;
    },
  });

  const candidatesQuery = useQuery({
    queryKey: ['account-candidates'],
    queryFn: async () => (await candidatesApi.listCandidates({ page: 1, size: 3 })).data,
  });

  const vacanciesQuery = useQuery({
    queryKey: ['account-vacancies'],
    queryFn: async () =>
      (await vacanciesApi.listVacancies({ page: 1, size: 3, status: 'open' })).data,
  });

  const mutation = useMutation({
    mutationFn: (values: Record<string, string>) => usersApi.updateProfile(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  if (profileQuery.isLoading) return <Spinner />;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Личный кабинет</p>
          <h1>Профиль</h1>
        </div>
        <Link to="settings">
          <Button type="default">Настройки</Button>
        </Link>
      </div>
      <div className={styles.columns}>
        <Card title="Личные данные">
          <Form
            form={form}
            layout="vertical"
            initialValues={profileQuery.data}
            onFinish={(values) => mutation.mutate(values)}
          >
            <Form.Item name="displayName" label="Имя" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Телефон">
              <Input />
            </Form.Item>
            <Form.Item name="position" label="Должность">
              <Input />
            </Form.Item>
            <Form.Item name="city" label="Город">
              <Input />
            </Form.Item>
            <Button htmlType="submit" loading={mutation.isPending}>
              Сохранить
            </Button>
          </Form>
        </Card>
        <div className={styles.stack}>
          <Card title="Кандидаты рядом">
            {candidatesQuery.data?.items.map((item) => (
              <div key={item.id}>
                <strong>{item.fullName}</strong>
                <div className={styles.meta}>{item.position}</div>
              </div>
            ))}
          </Card>
          <Card title="Открытые вакансии">
            {vacanciesQuery.data?.items.map((item) => (
              <div key={item.id}>
                <strong>{item.title}</strong>
                <div className={styles.meta}>{item.department}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
