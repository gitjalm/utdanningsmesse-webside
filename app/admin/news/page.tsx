import NewsTable, { type NewsTableItem } from "./components/NewsTable";

const news: NewsTableItem[] = [];

export default function NewsPage() {
  return (
    <section className="w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Nyheter</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Her kan du legge til, redigere og slette nyheter som vises pa
          nettsiden.
        </p>
      </div>
      <NewsTable news={news} />
    </section>
  );
}
