"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/schema";
import { signUp } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function RegisterPage() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const result = await signUp.email({
      email: data.email,
      username: data.username,
      name: data.name,
      password: data.password,
      role: "USER",
    });

    if (result.error) {
      toast.error("Klarte ikke å registrere", {
        description: result.error.message || "Feil ved registrering",
      });
      return;
    }

    toast.success("Bruker opprettet!");
    form.reset();
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px)]">
      <Card className="w-full my-10 sm:max-w-md">
        <CardHeader>
          <CardTitle>Opprett Bruker</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="register" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-email">E-post</FieldLabel>
                    <Input
                      {...field}
                      id="register-email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="navn@eksempel.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-name">Navn</FieldLabel>
                    <Input
                      {...field}
                      id="register-name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="Skriv inn navn"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-username">
                      Brukernavn
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-username"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="Skriv inn brukernavn"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-password">Passord</FieldLabel>
                    <Input
                      {...field}
                      id="register-password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="password"
                      placeholder="********"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation={"responsive"}>
            <Button type="submit" form="register">
              Registrer
            </Button>

            <Button variant="ghost">
              <Link href="/signin">Har du allerede bruker?</Link>
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
