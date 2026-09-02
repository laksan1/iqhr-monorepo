import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';
import styles from './Select.module.scss';

export type SelectProps = AntSelectProps;

export function Select({ className, ...props }: SelectProps) {
  const classes = [styles.select, className].filter(Boolean).join(' ');
  return <AntSelect className={classes} {...props} />;
}

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;
