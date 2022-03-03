import { ChangeEvent } from "react";

export interface Company {
  name: string;
  logo: string;
  specialties: string[];
  city: string;
  id: string;
}

export interface SearchPageProps {
  searchItems: Company[];
  filterList: string[];
}

export interface CardProps {
  searchItem: Company;
}

export interface AccordionProps {
  title: string;
}

export interface HandleSearch {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxProps {
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
