export type LocalizedText = {
  bn: string;
  en: string;
};

export type LocalizedSEO = {
  title: LocalizedText;
  description: LocalizedText;
  keywords?: string[];
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
