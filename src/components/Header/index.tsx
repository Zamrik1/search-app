import React, { FunctionComponent } from "react";
import styles from "./index.module.css";

const Header: FunctionComponent = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <h1>Cosuno Test App</h1>
    </div>
  );
};

export default Header;
