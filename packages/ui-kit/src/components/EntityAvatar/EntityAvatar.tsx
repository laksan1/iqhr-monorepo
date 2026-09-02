import styles from './EntityAvatar.module.scss';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export type EntityAvatarProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

export function EntityAvatar({ name, size = 'md' }: EntityAvatarProps) {
  return (
    <span className={`${styles.avatar} ${styles[size]}`} aria-hidden>
      {initials(name)}
    </span>
  );
}
