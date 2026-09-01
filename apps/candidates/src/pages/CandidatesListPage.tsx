import { useQuery } from '@tanstack/react-query';
import { Pagination, Space, Tag } from 'antd';
import { type CandidateStatus, CandidatesApi } from 'api-client';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Select, Spinner } from 'ui-kit';
import styles from './candidates.module.css';

const api = new CandidatesApi();

const statusLabels: Record<CandidateStatus, string> = {
  new: 'Новый',
  in_progress: 'В работе',
  hired: 'Нанят',
  rejected: 'Отказ',
};

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

  const options = useMemo(
    () =>
      (Object.keys(statusLabels) as CandidateStatus[]).map((value) => ({
        value,
        label: statusLabels[value],
      })),
    [],
  );

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Модуль candidates</p>
          <h1>Кандидаты</h1>
        </div>
        <Button type="default">Добавить кандидата</Button>
      </div>
      <Card>
        <Space wrap size="middle">
          <Input
            placeholder="Поиск по имени или роли"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            allowClear
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
          <Card key={item.id} className={styles.card}>
            <Tag color={item.status === 'hired' ? 'success' : 'default'}>
              {statusLabels[item.status]}
            </Tag>
            <h3>{item.fullName}</h3>
            <p>{item.position}</p>
            <p className={styles.meta}>
              {item.city} · {item.experienceYears} лет опыта
            </p>
            <Link to={item.id}>
              <Button type="link">Открыть профиль</Button>
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
