import classNames from "classnames";
import { ButtonProps } from "./types";

import styles from "./index.module.scss";

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        styles.button,
        className,
        styles[`button_${variant}`]
      )}
    >
      {children}
    </button>
  );
};
