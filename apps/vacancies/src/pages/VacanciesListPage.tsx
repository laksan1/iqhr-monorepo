import { useQuery } from '@tanstack/react-query';
import { Pagination, Space, Tag } from 'antd';
import { VacanciesApi, type VacancyStatus } from 'api-client';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Select, Spinner } from 'ui-kit';
import styles from './vacancies.module.css';

const api = new VacanciesApi();

const statusLabels: Record<VacancyStatus, string> = {
  draft: 'Черновик',
  open: 'Открыта',
  paused: 'На паузе',
  closed: 'Закрыта',
};

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

  const options = useMemo(
    () =>
      (Object.keys(statusLabels) as VacancyStatus[]).map((value) => ({
        value,
        label: statusLabels[value],
      })),
    [],
  );

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Модуль vacancies</p>
          <h1>Вакансии</h1>
        </div>
        <Button type="default">Новая вакансия</Button>
      </div>
      <Card>
        <Space wrap size="middle">
          <Input
            placeholder="Поиск по названию"
            value={search}
            allowClear
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            style={{ width: 280 }}
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
            style={{ width: 180 }}
          />
        </Space>
      </Card>
      {query.isLoading ? <Spinner /> : null}
      <div className={styles.grid}>
        {query.data?.items.map((item) => (
          <Card key={item.id}>
            <Tag color={item.status === 'open' ? 'success' : 'default'}>
              {statusLabels[item.status]}
            </Tag>
            <h3>{item.title}</h3>
            <p>
              {item.department} · {item.city}
            </p>
            <p className={styles.meta}>
              {item.salaryFrom?.toLocaleString('ru-RU')} – {item.salaryTo?.toLocaleString('ru-RU')}{' '}
              ₽
            </p>
            <Link to={item.id}>
              <Button type="link">Подробнее</Button>
            </Link>
          </Card>
        ))}
      </div>
      <Pagination
        current={page}
        pageSize={query.data?.size ?? 6}
        total={query.data?.total ?? 0}
        onChange={setPage}
      />
    </div>
  );
}
