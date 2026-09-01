import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = AntButtonProps & {
  children?: ReactNode;
};

export function Button({
  className,
  loading,
  size = 'middle',
  type = 'primary',
  ...props
}: ButtonProps) {
  const classes = [styles.button, className].filter(Boolean).join(' ');
  return <AntButton className={classes} loading={loading} size={size} type={type} {...props} />;
}
