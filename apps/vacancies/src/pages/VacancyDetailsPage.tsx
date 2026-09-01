import { useQuery } from '@tanstack/react-query';
import { Descriptions, Tag } from 'antd';
import { VacanciesApi } from 'api-client';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Spinner } from 'ui-kit';
import styles from './vacancies.module.css';

const api = new VacanciesApi();

const statusLabels = {
  draft: 'Черновик',
  open: 'Открыта',
  paused: 'На паузе',
  closed: 'Закрыта',
} as const;

export function VacancyDetailsPage() {
  const { id = '' } = useParams();
  const query = useQuery({
    queryKey: ['vacancy', id],
    queryFn: async () => {
      const { data } = await api.getVacancy(id);
      return data;
    },
    enabled: Boolean(id),
  });

  if (query.isLoading) return <Spinner />;
  if (!query.data) return <Card>Вакансия не найдена</Card>;

  const vacancy = query.data;

  return (
    <div className={styles.page}>
      <Link to="..">
        <Button type="text">← К списку</Button>
      </Link>
      <Card>
        <h1>{vacancy.title}</h1>
        <Tag>{statusLabels[vacancy.status] ?? vacancy.status}</Tag>
        <p>{vacancy.description}</p>
        <Descriptions column={1}>
          <Descriptions.Item label="Отдел">{vacancy.department}</Descriptions.Item>
          <Descriptions.Item label="Город">{vacancy.city}</Descriptions.Item>
          <Descriptions.Item label="Занятость">{vacancy.employmentType}</Descriptions.Item>
          <Descriptions.Item label="Открыто ставок">{vacancy.openings}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
