import React, { FunctionComponent } from "react";
import styles from "./index.module.css";

const Grid: FunctionComponent = ({ children }) => <div className={styles.grid}>{children}</div>;

export default Grid;
