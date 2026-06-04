import { Palette } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <section className="w-full max-w-3xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Innstillinger
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Her kan du tilpasse hvordan administrasjonssiden ser ut for deg.
          Valget lagres i nettleseren og følger systeminnstillingen din dersom
          du velger det.
        </p>
      </div>

      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Palette className="size-5" />
            </div>
            <div>
              <CardTitle>Tema</CardTitle>
              <CardDescription className="mt-1 leading-6">
                Bytt mellom lyst, mørkt eller automatisk tema basert på
                innstillingene til enheten din.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 rounded-md border bg-background p-4">
            <div>
              <p className="font-medium">Velg visning</p>
              <p className="text-sm text-muted-foreground">
                Bruk knappen for å endre tema.
              </p>
            </div>
            <ModeToggle />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
