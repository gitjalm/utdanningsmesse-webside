"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, ImageIcon, Trash2 } from "lucide-react";

type NewsStatus = "UTKAST" | "PUBLISERT" | "ARKIVERT";

export type NewsTableItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string;
  status: NewsStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  videos?: { id: string; url: string }[];
};

type NewsTableProps = {
  news: NewsTableItem[];
  onEdit?: (news: NewsTableItem) => void;
  onDelete?: (news: NewsTableItem) => void;
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

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default function NewsTable({ news, onEdit, onDelete }: NewsTableProps) {
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
              <th className="px-4 py-3">Videoer</th>
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
                <td className="px-4 py-3">{item.videos?.length ?? 0}</td>
                <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit?.(item)}
                      disabled={!onEdit}
                      aria-label={`Rediger ${item.title}`}
                    >
                      <Edit />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete?.(item)}
                      disabled={!onDelete}
                      aria-label={`Slett ${item.title}`}
                    >
                      <Trash2 />
                    </Button>
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
