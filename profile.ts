export interface ProfilePost {
  id: string;
  date: string;
  title: string;
  description: string;
  tags: [string];
  slug: string;
  comment: boolean;
}
