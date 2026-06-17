"use client";

import { Newspaper } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import NewsCard from "./components/NewsCard";
import { usePublishedNews } from "@/hooks/useNews";
import { News } from "../types/types";

export default function NewsPage() {
  const { data, isLoading, error } = usePublishedNews();
  const news = data ?? [];

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="py-16">
          <h1 className="text-4xl font-semibold tracking-tight">Nyheter</h1>
          <p className="mt-2 max-w-2xl text-md text-muted-foreground">
            Her kan du lese alt som har skjedd i det siste!
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full max-w-sm overflow-hidden rounded-lg border bg-card"
              >
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="space-y-4 p-6">
                  <div className="flex justify-end">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mb-16 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Kunne ikke hente nyheter."}
          </div>
        ) : news.length === 0 ? (
          <div className="mb-16 flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 py-12 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Newspaper className="size-6" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">
              Ingen nyheter enda
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Det er ingen publiserte nyheter for tiden. Kom tilbake senere for
              oppdateringer.
            </p>
          </div>
        ) : (
          <div className="grid justify-items-center gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((newsItem: News) => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
