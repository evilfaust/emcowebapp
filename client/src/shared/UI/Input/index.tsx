import { IInputProps } from "./types";

import styles from './index.module.scss'

export const Input: React.FC<IInputProps> = ({ label, id, }) => {
  return (
    <div className={styles.container}>
      <label>
        {label}
        <input id={id} type="text" />
      </label>
    </div>
  );
};
