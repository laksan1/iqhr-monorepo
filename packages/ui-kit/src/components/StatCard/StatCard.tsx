import styles from './StatCard.module.css';

export type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'default' | 'success' | 'warning' | 'info' | 'danger';
};

export function StatCard({ label, value, hint, tone = 'default' }: StatCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </article>
  );
}
