export type NewsStatus = "UTKAST" | "PUBLISERT" | "ARKIVERT";

export type News = {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string;
  status: NewsStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
};
