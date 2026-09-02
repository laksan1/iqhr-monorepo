import { useQuery } from '@tanstack/react-query';
import { Descriptions } from 'antd';
import { CandidatesApi } from 'api-client';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, EntityAvatar, Spinner, StatusTag } from 'ui-kit';
import styles from './candidates.module.scss';

const api = new CandidatesApi();

const statusLabels = {
  new: 'Новый',
  in_progress: 'В работе',
  hired: 'Нанят',
  rejected: 'Отказ',
} as const;

function formatDate(value?: string) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

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
        <Button type="text">← К списку кандидатов</Button>
      </Link>

      <Card>
        <div className={styles.detailHero}>
          <EntityAvatar name={candidate.fullName} size="lg" />
          <div>
            <StatusTag label={statusLabels[candidate.status]} status={candidate.status} />
            <h1>{candidate.fullName}</h1>
            <p className={styles.role}>{candidate.position}</p>
            <p className={styles.meta}>
              {candidate.city} · {candidate.experienceYears} лет опыта · обновлено{' '}
              {formatDate(candidate.updatedAt)}
            </p>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <Card title="Контакты и профиль">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Email">{candidate.email}</Descriptions.Item>
              <Descriptions.Item label="Телефон">{candidate.phone}</Descriptions.Item>
              <Descriptions.Item label="Город">{candidate.city}</Descriptions.Item>
              <Descriptions.Item label="Опыт">{candidate.experienceYears} лет</Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="Навыки">
            <div className={styles.skills}>
              {candidate.skills?.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <Card title="История этапов" style={{ marginTop: 16 }}>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <strong>Отклик получен</strong>
              <span>Резюме загружено через карьерный портал</span>
            </div>
            <div className={styles.timelineItem}>
              <strong>Скрининг рекрутера</strong>
              <span>Оценка релевантности и мотивации кандидата</span>
            </div>
            <div className={styles.timelineItem}>
              <strong>Техническое интервью</strong>
              <span>Следующий шаг — встреча с hiring manager</span>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}
