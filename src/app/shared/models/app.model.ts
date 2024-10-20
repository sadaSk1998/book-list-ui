export interface GetBooksResponse {
  kind: string;
  totalItems: number;
  items: any[];
}
export interface BookDetails {
  title: string;
  publisher: string;
  authors: string[];
  publishedDate: string;
}

export interface Book {
  title: string;
  publisher: string;
  authors: string;
  publishedDate: string;
  id?: string;
}
