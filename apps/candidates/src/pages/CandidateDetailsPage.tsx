import { useQuery } from '@tanstack/react-query';
import { Descriptions, Tag } from 'antd';
import { CandidatesApi } from 'api-client';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Spinner } from 'ui-kit';
import styles from './candidates.module.css';

const api = new CandidatesApi();

const statusLabels = {
  new: 'Новый',
  in_progress: 'В работе',
  hired: 'Нанят',
  rejected: 'Отказ',
} as const;

export function CandidateDetailsPage() {
  const { id = '' } = useParams();
  const query = useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const { data } = await api.getCandidate(id);
      return data;
    },
    enabled: Boolean(id),
  });

  if (query.isLoading) return <Spinner />;
  if (!query.data) return <Card>Кандидат не найден</Card>;

  const candidate = query.data;

  return (
    <div className={styles.page}>
      <Link to="..">
        <Button type="text">← К списку</Button>
      </Link>
      <Card>
        <h1>{candidate.fullName}</h1>
        <Tag>{statusLabels[candidate.status] ?? candidate.status}</Tag>
        <Descriptions column={1} style={{ marginTop: 16 }}>
          <Descriptions.Item label="Роль">{candidate.position}</Descriptions.Item>
          <Descriptions.Item label="Город">{candidate.city}</Descriptions.Item>
          <Descriptions.Item label="Email">{candidate.email}</Descriptions.Item>
          <Descriptions.Item label="Телефон">{candidate.phone}</Descriptions.Item>
          <Descriptions.Item label="Навыки">{candidate.skills?.join(', ')}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
