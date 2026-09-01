import styles from './StatusTag.module.css';

const toneMap = {
  new: 'info',
  in_progress: 'warning',
  hired: 'success',
  rejected: 'danger',
  draft: 'default',
  open: 'success',
  paused: 'warning',
  closed: 'default',
} as const;

export type StatusTagProps = {
  label: string;
  status?: keyof typeof toneMap;
};

export function StatusTag({ label, status }: StatusTagProps) {
  const tone = status ? toneMap[status] : 'default';
  return <span className={`${styles.tag} ${styles[tone]}`}>{label}</span>;
}
