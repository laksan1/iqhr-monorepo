import { Spin } from 'antd';
import styles from './Spinner.module.scss';

export function Spinner({ tip = 'Загрузка...' }: { tip?: string }) {
  return (
    <div className={styles.wrap}>
      <Spin size="large" description={tip}>
        <div className={styles.placeholder} />
      </Spin>
    </div>
  );
}
