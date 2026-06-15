"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { newsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function AddNewsPage() {
  const form = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "INFO",
      status: "UTKAST",
      image_url: "",
    },
  });

  async function addNews(data: z.infer<typeof newsSchema>) {
    toast.success("Du fikk laget en nyhet");
  }

  function showValidationError() {
    toast.error("Sjekk feltene i skjemaet", {
      description: "Noen felt mangler eller har for kort tekst.",
    });
  }

  return (
    <section className="w-3/4 px-6 py-8">
      <div className="w-full px-6 py-4">
        <form
          id="create-news"
          className="min-h-0 flex-1 overflow-y-auto mb-6"
          onSubmit={form.handleSubmit(addNews, showValidationError)}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-news-title">Tittel</FieldLabel>
                  <Input
                    {...field}
                    id="create-news-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Skriv inn tittel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-news-content">Innhold</FieldLabel>
                  <Input
                    {...field}
                    id="create-news-content"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Skriv inn innhold"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-news-category">
                    Kategori
                  </FieldLabel>
                  <Input
                    {...field}
                    id="create-news-category"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Skriv inn kategori"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-news-status">Status</FieldLabel>
                  <Input
                    {...field}
                    id="create-news-status"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Skriv inn status"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-news-image">
                    Bilde Link
                  </FieldLabel>
                  <Input
                    {...field}
                    id="create-news-image"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Skriv inn bilde link"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="create-news"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Oppretter" : "Lag Nyhet"}
        </Button>
      </div>
    </section>
  );
}
