import React, { FunctionComponent, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import { AccordionProps } from "types/types";

const Accordion: FunctionComponent<AccordionProps> = ({ children, title }): React.ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.container}>
      <div onClick={handleAccordion} className={styles.accordion} title="Filters:">
        <div className={styles.accordionTitle}>{title}</div>
      </div>
      <div
        className={classNames(styles.accordionContent, {
          [styles.accordionExpanded]: expanded,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
