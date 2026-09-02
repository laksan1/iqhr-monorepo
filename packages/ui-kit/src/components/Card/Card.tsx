import { Card as AntCard, type CardProps as AntCardProps } from 'antd';
import type { ReactNode } from 'react';
import styles from './Card.module.scss';

export type CardProps = AntCardProps & {
  children?: ReactNode;
};

export function Card({ className, variant = 'outlined', ...props }: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(' ');
  return <AntCard variant={variant} className={classes} {...props} />;
}
