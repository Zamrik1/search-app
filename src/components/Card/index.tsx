import React, { FunctionComponent } from "react";
import { CardProps } from "types/types";
import styles from "./index.module.css";

const Card: FunctionComponent<CardProps> = ({ searchItem }): React.ReactElement => (
  <div className={styles.card} key={searchItem.id}>
    <div className={styles.cardBody}>
      <img className={styles.cardImage} src={searchItem.logo} alt={searchItem.name} />
    </div>
    <div className={styles.cardSubContent}>
      <p>{searchItem.name}</p>
    </div>
  </div>
);

export default Card;
