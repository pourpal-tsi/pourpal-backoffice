export interface Paging {
  count: number;
  page_size: number;
  page_number: number;
  total_count: number;
  total_pages: number;
  first_page: boolean;
  last_page: boolean;
}
