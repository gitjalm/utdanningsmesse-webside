"use client";

import { News, NewsStatus } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NewsTableProps = {
  news: News[];
};

const statusLabels: Record<NewsStatus, string> = {
  UTKAST: "Utkast",
  PUBLISERT: "Publisert",
  ARKIVERT: "Arkivert",
};

const statusClassNames: Record<NewsStatus, string> = {
  UTKAST: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  PUBLISERT: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  ARKIVERT: "bg-muted text-muted-foreground",
};

function DeleteNews({ news }: { news: News }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/news/${news.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: news.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete news");
      }
    },
    onSuccess: () => {
      toast.success("Nyheten ble slettet");
      queryClient.invalidateQueries({ queryKey: ["news"] });
      router.refresh();
    },
    onError: (error) => {
      toast.error("Klarte ikke å slette nyheten", {
        description:
          error instanceof Error
            ? error.message
            : "Feil ved sletting av nyheten",
      });
    },
  });

  function handleDelete() {
    const confirmed = window.confirm(
      `Er du sikker på at du vil slette "${news.title}"?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate();
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
      aria-label={`Slett ${news.title}`}
    >
      <Trash2 />
    </Button>
  );
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default function NewsTable({ news }: NewsTableProps) {
  if (!news.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Ingen nyheter er lagt til enda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs font-medium uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Bilde</th>
              <th className="px-4 py-3">Nyhet</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Opprettet</th>
              <th className="px-4 py-3 text-right">Handlinger</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {news.map((item) => (
              <tr key={item.id} className="bg-background">
                <td className="px-4 py-3">
                  <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-md bg-muted">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="size-5 text-muted-foreground" />
                    )}
                  </div>
                </td>
                <td className="max-w-[320px] px-4 py-3">
                  <div className="font-medium">{item.title}</div>
                  <p className="mt-1 line-clamp-2 text-muted-foreground">
                    {item.content}
                  </p>
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-md px-2 py-1 text-xs font-medium",
                      statusClassNames[item.status],
                    )}
                  >
                    {statusLabels[item.status]}
                  </span>
                </td>
                <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Rediger ${item.title}`}
                    >
                      <Link href="/admin/news/edit">
                        <Edit />
                      </Link>
                    </Button>
                    <DeleteNews news={item} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
