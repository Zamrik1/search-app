import React, { FunctionComponent } from "react";
import { CheckboxProps } from "types/types";
import styles from "./index.module.css";

const Checkbox: FunctionComponent<CheckboxProps> = ({ onChange, title }): React.ReactElement => {
  return (
    <div className={styles.checkbox}>
      <input value={title} id={title} type="checkbox" onChange={onChange} className={styles.checkboxInput} />
      <label className={styles.label} htmlFor={title}>
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
