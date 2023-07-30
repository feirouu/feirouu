export interface PostMeta {
  id: string;
  date: string;
  filename: string;
  title: string;
  description: string;
  tags: Array<string>;
  comment: boolean;
  slug: string;
  readingTime: number;
}
