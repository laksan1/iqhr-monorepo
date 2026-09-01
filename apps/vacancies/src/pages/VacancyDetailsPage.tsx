import { useQuery } from '@tanstack/react-query';
import { Descriptions } from 'antd';
import { VacanciesApi } from 'api-client';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Spinner, StatusTag } from 'ui-kit';
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
        <Button type="text">← К списку вакансий</Button>
      </Link>
      <Card>
        <div className={styles.detailHero}>
          <StatusTag label={statusLabels[vacancy.status]} status={vacancy.status} />
          <h1>{vacancy.title}</h1>
          <div className={styles.detailMeta}>
            <span className={styles.pill}>{vacancy.department}</span>
            <span className={styles.pill}>{vacancy.city}</span>
            <span className={styles.pill}>{vacancy.employmentType}</span>
            <span className={styles.pill}>{vacancy.openings} ставок</span>
          </div>
          <p className={styles.salary}>
            {vacancy.salaryFrom?.toLocaleString('ru-RU')} –{' '}
            {vacancy.salaryTo?.toLocaleString('ru-RU')} ₽ gross
          </p>
        </div>
        <p className={styles.excerpt} style={{ WebkitLineClamp: 'unset' }}>
          {vacancy.description}
        </p>
        <Descriptions column={2} style={{ marginTop: 20 }}>
          <Descriptions.Item label="Отдел">{vacancy.department}</Descriptions.Item>
          <Descriptions.Item label="Город">{vacancy.city}</Descriptions.Item>
          <Descriptions.Item label="Занятость">{vacancy.employmentType}</Descriptions.Item>
          <Descriptions.Item label="Открыто ставок">{vacancy.openings}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
