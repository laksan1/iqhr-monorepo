import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form } from 'antd';
import { CandidatesApi, UsersApi, VacanciesApi } from 'api-client';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  EntityAvatar,
  Input,
  PageHeader,
  Spinner,
  StatCard,
  StatusTag,
} from 'ui-kit';
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
    queryFn: async () => (await candidatesApi.listCandidates({ page: 1, size: 4 })).data,
  });

  const vacanciesQuery = useQuery({
    queryKey: ['account-vacancies'],
    queryFn: async () =>
      (await vacanciesApi.listVacancies({ page: 1, size: 4, status: 'open' })).data,
  });

  const mutation = useMutation({
    mutationFn: (values: Record<string, string>) => usersApi.updateProfile(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  if (profileQuery.isLoading) return <Spinner />;

  const profile = profileQuery.data;

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Личный кабинет"
        title="Профиль HR-менеджера"
        subtitle="Данные из shell-service, кандидаты и вакансии — из связанных сервисов."
        actions={
          <Link to="settings">
            <Button type="default">Настройки</Button>
          </Link>
        }
      />

      <div className={styles.stats}>
        <StatCard
          label="Кандидаты в работе"
          value={candidatesQuery.data?.items.filter((c) => c.status === 'in_progress').length ?? 0}
          tone="warning"
        />
        <StatCard
          label="Открытые вакансии"
          value={vacanciesQuery.data?.items.length ?? 0}
          tone="success"
        />
        <StatCard label="Отдел" value={profile?.department ?? '—'} />
        <StatCard label="Город" value={profile?.city ?? '—'} />
      </div>

      <div className={styles.columns}>
        <Card title="Личные данные" className={styles.profileCard}>
          <div className={styles.profileHead}>
            <EntityAvatar name={profile?.displayName ?? 'HR'} size="lg" />
            <div>
              <h2 className={styles.profileName}>{profile?.displayName}</h2>
              <p className={styles.profileRole}>{profile?.position}</p>
            </div>
          </div>
          <Form
            form={form}
            layout="vertical"
            initialValues={profile}
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
              Сохранить изменения
            </Button>
          </Form>
        </Card>

        <div className={styles.stack}>
          <Card title="Кандидаты в фокусе">
            <div className={styles.list}>
              {candidatesQuery.data?.items.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <EntityAvatar name={item.fullName} size="sm" />
                  <div>
                    <strong>{item.fullName}</strong>
                    <div className={styles.meta}>{item.position}</div>
                  </div>
                  <StatusTag
                    label={
                      item.status === 'in_progress'
                        ? 'В работе'
                        : item.status === 'new'
                          ? 'Новый'
                          : item.status
                    }
                    status={item.status}
                  />
                </div>
              ))}
            </div>
          </Card>
          <Card title="Горящие вакансии">
            <div className={styles.list}>
              {vacanciesQuery.data?.items.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div>
                    <strong>{item.title}</strong>
                    <div className={styles.meta}>
                      {item.department} · {item.openings} ставок
                    </div>
                  </div>
                  <StatusTag label="Открыта" status="open" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
