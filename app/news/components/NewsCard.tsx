import { News } from "@/app/types/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewsCard({ news }: { news: News }) {
  return (
    <Card className="relative w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={news.image_url}
        alt="Nyhets Bilde"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{news.category}</Badge>
        </CardAction>
        <CardTitle>{news.title}</CardTitle>
        <CardDescription>{news.briefDescription}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Les Mer</Button>
      </CardFooter>
    </Card>
  );
}
