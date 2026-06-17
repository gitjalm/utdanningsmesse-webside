import { useQuery } from "@tanstack/react-query";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");

      if (!response.ok) {
        throw new Error("Kunne ikke hente nyheter");
      }

      return response.json();
    },
  });
}

export function usePublishedNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news/published");

      if (!response.ok) {
        throw new Error("Kunne ikke hente nyheter");
      }

      return response.json();
    },
  });
}
