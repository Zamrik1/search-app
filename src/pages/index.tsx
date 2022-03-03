// Utils/libraries
import { ChangeEvent, useEffect, useState } from "react";
import { debounce } from "debounce";
import { log } from "util/logger";
// UI Elements
import Accordion from "components/Accordion";
import Card from "components/Card";
import Checkbox from "components/Checkbox";
import Grid from "components/Grid";
import SearchBar from "components/SearchBar";
// Types
import type { GetServerSideProps, NextPage } from "next";
import { Company, SearchPageProps } from "types/types";
// Styles
import styles from "styles/index.module.css";

const SearchPage: NextPage<SearchPageProps> = ({ searchItems, filterList }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Company[]>(searchItems);
  const [filters, setFilters] = useState<string[]>([]);

  /**
   * listen to changes in search term and filters and restate the companies array according to the new values
   */
  useEffect(() => {
    const filteredItems = searchItems.filter((searchItem) => {
      const name = searchItem.name.toLowerCase();
      if (filters.length > 0) {
        return name.indexOf(searchTerm) > -1 && filters.every((filter) => searchItem.specialties.includes(filter));
      }
      return name.indexOf(searchTerm) > -1;
    });
    console.log(filteredItems, "filteredItems");
    setResults(filteredItems);
  }, [filters, searchTerm, searchItems]);

  /**
   * change event listener of search bar (input field of type search). debounces with  an interval of
   * 300ms.
   * Updates the current state for the searchTerm
   */
  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  }, 300);

  /**
   * updates the current applied filters list
   * @param event native change event that is passed by checkbox component onChange listener
   */
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilters([...filters, event.target.value]);
    } else {
      const filtersCopy = filters;
      const filterIndex = filtersCopy.indexOf(event.target.value);
      filters.splice(filterIndex, 1);
      setFilters([...filtersCopy]);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar handleSearch={handleSearch} />
      <Accordion title="Filters: ">
        {filterList.map((filterTitle) => (
          <Checkbox title={filterTitle} onChange={handleFilterChange} key={filterTitle} />
        ))}
      </Accordion>
      <Grid>
        {results.map((searchItem) => (
          <Card searchItem={searchItem} key={searchItem.id} />
        ))}
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  /**
   * List of companies returned from API
   */
  let companies: Company[] = [];
  /**
   * List of possible filters generated from the list of companies
   */
  let filterList: string[] = [];
  try {
    const response = await fetch(`${process.env.API_URL}/companies`);
    companies = await response.json();

    filterList = companies
      .map((company) => company.specialties)
      // reduce the array of specialties arrays that is generated via map to a string array
      .reduce((acc, specialties) => {
        // remove any duplication of attributes that might happen
        specialties.forEach((specialty) => {
          if (acc.indexOf(specialty) < 0) {
            acc.push(specialty);
          }
        });
        return acc;
      }, []);
  } catch (error) {
    log.error("Failed to fetch data from the API with error: ", error);
  }
  return {
    props: {
      searchItems: companies,
      filterList,
    },
  };
};

export default SearchPage;
