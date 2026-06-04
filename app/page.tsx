import Link from "next/link";
import { ArrowRight, Layers, LockKeyhole, Sparkles } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Layers,
    title: "Feature tittel1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.",
  },
  {
    icon: Sparkles,
    title: "Feature tittel2",
    description:
      "Sed cursus ante dapibus diam. Sed nisi nulla quis sem at nibh elementum imperdiet.",
  },
  {
    icon: LockKeyhole,
    title: "Feature tittel3",
    description:
      "Duis sagittis ipsum. Praesent mauris fusce nec tellus sed augue semper porta.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="border-b bg-muted/30">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Boilerplate Landing Page
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              Velkommen til min Next.js boilerplate!
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace
              this text with a short description of your product, service, or
              application.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Kom i gang
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/signin">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Seksjon Tittel
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Simpel Seksjon Overskrift
            </h2>
            <p className="mt-4 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Endre
              dette med en liten beskrivelse av seksjonen.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="rounded-lg shadow-sm">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 px-5 py-14 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Overskrift</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Endre med
              en liten tekst
            </p>
          </div>
          <Button asChild>
            <Link href="/signup">
              Kom i gang
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
