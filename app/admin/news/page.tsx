"use client";

import { Plus } from "lucide-react";
import NewsTable from "./components/NewsTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useNews } from "@/hooks/useNews";

export default function NewsPage() {
  const { data, isLoading, error } = useNews();

  return (
    <section className="w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Nyheter</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Her kan du legge til, redigere og slette nyheter som vises pa
          nettsiden.
        </p>
      </div>
      <div>
        <Button className="mb-4">
          <Link href="/admin/news/add" className="flex items-center gap-2">
            <Plus />
            Ny Nyhet
          </Link>
        </Button>
        {isLoading ? (
          <div className="overflow-hidden rounded-lg border">
            <div className="border-b bg-muted/50 px-4 py-3">
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[56px_1fr_120px_100px] items-center gap-4 px-4 py-3"
                >
                  <Skeleton className="size-14 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-full max-w-sm" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-20 justify-self-end" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Kunne ikke hente nyheter."}
          </div>
        ) : (
          <NewsTable news={data ?? []} />
        )}
      </div>
    </section>
  );
}
