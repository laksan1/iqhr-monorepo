import { useQuery } from '@tanstack/react-query';
import { Pagination, Space } from 'antd';
import { CandidatesApi } from 'api-client';
import type { CandidateStatus } from 'api-client/types';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  EntityAvatar,
  Input,
  PageHeader,
  Select,
  Spinner,
  StatCard,
  StatusTag,
} from 'ui-kit';
import styles from './candidates.module.scss';

const api = new CandidatesApi();

const statusLabels: Record<CandidateStatus, string> = {
  new: 'Новый',
  in_progress: 'В работе',
  hired: 'Нанят',
  rejected: 'Отказ',
};

function formatDate(value?: string) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function CandidatesListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CandidateStatus | undefined>();

  const query = useQuery({
    queryKey: ['candidates', page, search, status],
    queryFn: async () => {
      const { data } = await api.listCandidates({ page, size: 6, search, status });
      return data;
    },
  });

  const statsQuery = useQuery({
    queryKey: ['candidates-stats'],
    queryFn: async () => (await api.listCandidates({ page: 1, size: 100 })).data,
  });

  const options = useMemo(
    () =>
      (Object.keys(statusLabels) as CandidateStatus[]).map((value) => ({
        value,
        label: statusLabels[value],
      })),
    [],
  );

  const stats = useMemo(() => {
    const items = statsQuery.data?.items ?? [];
    return {
      total: statsQuery.data?.total ?? items.length,
      new: items.filter((item) => item.status === 'new').length,
      inProgress: items.filter((item) => item.status === 'in_progress').length,
      hired: items.filter((item) => item.status === 'hired').length,
    };
  }, [statsQuery.data]);

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Рекрутинг"
        title="Кандидаты"
        subtitle="Воронка найма: отклики, интервью и офферы. Данные из candidate-service (mock)."
        actions={<Button type="default">+ Добавить кандидата</Button>}
      />

      <div className={styles.stats}>
        <StatCard label="Всего в базе" value={stats.total} hint="Активные карточки" />
        <StatCard label="Новые" value={stats.new} tone="info" hint="Ждут первого контакта" />
        <StatCard
          label="В работе"
          value={stats.inProgress}
          tone="warning"
          hint="Интервью и проверки"
        />
        <StatCard label="Наняты" value={stats.hired} tone="success" hint="За последний квартал" />
      </div>

      <Card className={styles.filters}>
        <Space wrap size="middle">
          <Input
            placeholder="Поиск по имени, роли или навыку"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            allowClear
            style={{ width: 320 }}
          />
          <Select
            allowClear
            placeholder="Статус"
            options={options}
            value={status}
            onChange={(value) => {
              setPage(1);
              setStatus(value);
            }}
            style={{ width: 200 }}
          />
        </Space>
      </Card>

      {query.isLoading ? <Spinner /> : null}

      <div className={styles.grid}>
        {query.data?.items.map((item) => (
          <Card key={item.id} className={styles.card}>
            <div className={styles.cardTop}>
              <EntityAvatar name={item.fullName} />
              <div className={styles.cardHead}>
                <StatusTag label={statusLabels[item.status]} status={item.status} />
                <h3>{item.fullName}</h3>
                <p className={styles.role}>{item.position}</p>
              </div>
            </div>
            <p className={styles.meta}>
              {item.city} · {item.experienceYears} лет опыта
            </p>
            <div className={styles.skills}>
              {item.skills?.slice(0, 3).map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.updated}>Обновлено {formatDate(item.updatedAt)}</span>
              <Link to={item.id}>
                <Button type="link">Профиль →</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.pagination}>
        <Pagination
          current={page}
          pageSize={query.data?.size ?? 6}
          total={query.data?.total ?? 0}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
