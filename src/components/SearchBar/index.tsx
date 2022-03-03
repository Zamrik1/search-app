import React, { FunctionComponent } from "react";
import { HandleSearch } from "types/types";
import styles from "./index.module.css";

const SearchBar: FunctionComponent<HandleSearch> = ({ handleSearch }): React.ReactElement => {
  return (
    <label className={styles.label}>
      <input type="search" placeholder="search" onChange={handleSearch} className={styles.searchBar} />
    </label>
  );
};

export default SearchBar;
