export interface Article {
  id: number;
  title: string;
  body: string;
  views: number;
  tags: string[];
}

export interface ArticleApiResponse {
  posts: Article[];
  total: number;
}
