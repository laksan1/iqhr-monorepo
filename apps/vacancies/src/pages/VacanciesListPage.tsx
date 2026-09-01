import { useQuery } from '@tanstack/react-query';
import { Pagination, Space } from 'antd';
import { VacanciesApi } from 'api-client';
import type { VacancyStatus } from 'api-client/types';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, PageHeader, Select, Spinner, StatCard, StatusTag } from 'ui-kit';
import styles from './vacancies.module.css';

const api = new VacanciesApi();

const statusLabels: Record<VacancyStatus, string> = {
  draft: 'Черновик',
  open: 'Открыта',
  paused: 'На паузе',
  closed: 'Закрыта',
};

function formatSalary(from?: number, to?: number) {
  if (!from && !to) return 'По договорённости';
  const fmt = (n: number) => n.toLocaleString('ru-RU');
  return `${fmt(from ?? 0)} – ${fmt(to ?? 0)} ₽`;
}

function formatDate(value?: string) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(
    new Date(value),
  );
}

export function VacanciesListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<VacancyStatus | undefined>();

  const query = useQuery({
    queryKey: ['vacancies', page, search, status],
    queryFn: async () => {
      const { data } = await api.listVacancies({ page, size: 6, search, status });
      return data;
    },
  });

  const statsQuery = useQuery({
    queryKey: ['vacancies-stats'],
    queryFn: async () => (await api.listVacancies({ page: 1, size: 100 })).data,
  });

  const options = useMemo(
    () =>
      (Object.keys(statusLabels) as VacancyStatus[]).map((value) => ({
        value,
        label: statusLabels[value],
      })),
    [],
  );

  const stats = useMemo(() => {
    const items = statsQuery.data?.items ?? [];
    return {
      open: items.filter((item) => item.status === 'open').length,
      openings: items.reduce((sum, item) => sum + (item.openings ?? 0), 0),
      paused: items.filter((item) => item.status === 'paused').length,
      departments: new Set(items.map((item) => item.department)).size,
    };
  }, [statsQuery.data]);

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Вакансии"
        title="Открытые позиции 222"
        subtitle="Управление вакансиями, бюджетами и статусами публикации. Данные vacancy-service (mock)."
        actions={<Button type="default">+ Новая вакансия</Button>}
      />

      <div className={styles.stats}>
        <StatCard label="Открытые" value={stats.open} tone="success" hint="Активный найм" />
        <StatCard label="Ставок" value={stats.openings} tone="info" hint="Суммарно по вакансиям" />
        <StatCard label="На паузе" value={stats.paused} tone="warning" hint="Временно закрыты" />
        <StatCard label="Отделов" value={stats.departments} hint="В текущем портфеле" />
      </div>

      <Card className={styles.filters}>
        <Space wrap size="middle">
          <Input
            placeholder="Поиск по названию или отделу"
            value={search}
            allowClear
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
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
            <div className={styles.cardHeader}>
              <StatusTag label={statusLabels[item.status]} status={item.status} />
              <span className={styles.badge}>{item.openings} ставок</span>
            </div>
            <h3>{item.title}</h3>
            <p className={styles.department}>{item.department}</p>
            <p className={styles.meta}>
              {item.city} · {item.employmentType}
            </p>
            <p className={styles.salary}>{formatSalary(item.salaryFrom, item.salaryTo)}</p>
            <p className={styles.excerpt}>{item.description}</p>
            <div className={styles.cardFooter}>
              <span className={styles.updated}>Обновлено {formatDate(item.updatedAt)}</span>
              <Link to={item.id}>
                <Button type="link">Подробнее →</Button>
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
        />
      </div>
    </div>
  );
}
