import { Input as AntInput, type InputProps as AntInputProps } from 'antd';
import styles from './Input.module.css';

export type InputProps = AntInputProps;

export function Input({ className, ...props }: InputProps) {
  const classes = [styles.input, className].filter(Boolean).join(' ');
  return <AntInput className={classes} {...props} />;
}

Input.Password = AntInput.Password;
Input.TextArea = AntInput.TextArea;
Input.Search = AntInput.Search;
