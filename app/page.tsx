import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="border-b bg-muted/30">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Hjemmeside
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              Velkommen til
              <br />
              <strong className="text-primary">utdanningsmessen</strong>!
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Endre
              dette med en liten beskrivelse av hva utdanningsmessen er.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/nyheter">
                  Kom i gang
                  <ArrowRight className="size-4" />
                </Link>
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
        </div>
      </section>
    </main>
  );
}
